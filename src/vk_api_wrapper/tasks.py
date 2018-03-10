import vk_api
from celery.task import task
from django.conf import settings
from django.db import IntegrityError

from .models import VkDialogsList, VkDialog, VkMessagesList, VkAttachmentFactory

VK_DIALOG_COUNT = 200
VK_MESSAGES_COUNT = 200


def get_user_info(api, user_id):
    response = api.users.get(user_ids=user_id)
    return response[0]


def get_group_info(api, group_id):
    response = api.groups.getById(group_id=group_id)
    return response[0]


@task
def download_dialog_list(access_token, user_id):
    vk_dialogs_list, created = VkDialogsList.objects.get_or_create(user_id=user_id)
    vk_session = vk_api.VkApi(token=access_token, client_secret=settings.VK_CLIENT_SECRET_KEY)
    api = vk_session.get_api()
    params = {
        'count': VK_DIALOG_COUNT,
        'preview_length': 1,
    }
    offset = 0
    response = api.messages.getDialogs(**params)
    count_to_download = response['count']
    last_message_id = None
    current_read = None
    if vk_dialogs_list.start_message_id:
        last_message_id = vk_dialogs_list.start_message_id
        current_read = vk_dialogs_list.start_message_id + 1
        # params['start_message_id'] = vk_dialogs_list.start_message_id
        # response = api.messages.getDialogs(**params)
        # count_to_download -= response['count']
        # del params['start_message_id']
    while offset < count_to_download and (last_message_id is None or last_message_id < current_read):
        response = api.messages.getDialogs(**params)

        for item in response['items']:
            vk_dialogs_list.start_message_id = max(vk_dialogs_list.start_message_id or 0,
                                                   item['in_read'],
                                                   item['out_read']
                                                   )
            current_read = min(current_read, item['in_read'])
            if last_message_id and last_message_id > current_read:
                break
            dialog_info = {}
            try:
                dialog = VkDialog.parse_message(item['message'])
                dialog.user_id = user_id
                if not dialog.is_chat:
                    if dialog.chat_id > 0:
                        user_info = get_user_info(api, dialog.chat_id)
                        dialog.title = "{} {}".format(user_info['last_name'], user_info['first_name'])
                    else:
                        group_info = get_group_info(api, -dialog.chat_id)
                        dialog.title = group_info['name']
                dialog_info['chat_id'] = dialog.chat_id
                dialog_info['is_group_chat'] = dialog.is_chat
                dialog.save()
            except IntegrityError:
                pass
            download_dialog_history.apply_async(kwargs={
                'access_token': access_token,
                'user_id': user_id,
                'chat_id': dialog_info['chat_id'],
                'is_group_chat': dialog_info['is_group_chat']
            })
        offset += VK_DIALOG_COUNT
        params['offset'] = offset

    vk_dialogs_list.save()
    # response = api.messages.getDialogs(**params)


@task
def download_dialog_history(access_token, user_id, chat_id, is_group_chat, media_type='doc'):
    vk_dialog = VkDialog.objects.select_related('chatfolder').get(user_id=user_id,
                                                                  chat_id=chat_id,
                                                                  is_chat=is_group_chat)
    vk_messages_history, created = VkMessagesList.objects.get_or_create(dialog=vk_dialog)
    vk_session = vk_api.VkApi(token=access_token, client_secret=settings.VK_CLIENT_SECRET_KEY)
    api = vk_session.get_api()
    params = {
        'peer_id': 2000000000 + chat_id if is_group_chat else chat_id,
        'media_type': media_type,
        'count': VK_MESSAGES_COUNT,
    }

    if not created:
        end_message_id = vk_messages_history.start_from
    else:
        end_message_id = None
    current_msg_id = end_message_id
    while end_message_id is None or current_msg_id > end_message_id:
        response = api.messages.getHistoryAttachments(**params)

        for item in response['items']:
            vk_messages_history.start_from = max(
                vk_messages_history.start_from or 0,
                item['message_id']
            )
            try:
                attach = VkAttachmentFactory.parse_message(item['attachment'])
                attach.user_id = user_id
                attach.vk_dialog = vk_dialog
                attach.save()
            except IntegrityError:
                pass
        if not response['items']:
            break

        params['start_from'] = response['next_from']
        current_msg_id_str, _ = response['next_from'].split('/')
        current_msg_id = int(current_msg_id_str)

    vk_messages_history.save()
