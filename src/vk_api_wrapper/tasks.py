import vk_api
from celery.task import task
from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import IntegrityError
from social_django.utils import load_strategy

from core.models import UserRequestLog
from .models import VkDialogsList, VkDialog, VkMessagesList, VkAttachmentFactory, VkDocsList


UserModel = get_user_model()

VK_DIALOG_COUNT = 200
VK_MESSAGES_COUNT = 200
VK_DOCS_COUNT = 200


def get_vk_api(access_token):
    vk_session = vk_api.VkApi(token=access_token, client_secret=settings.VK_CLIENT_SECRET_KEY)
    api = vk_session.get_api()
    return api


def get_user_info(api, user_id):
    response = api.users.get(user_ids=user_id)
    return response[0]


def get_group_info(api, group_id):
    response = api.groups.getById(group_id=group_id)
    return response[0]


@task
def download_dialog_list(access_token, user_id):
    vk_dialogs_list, created = VkDialogsList.objects.get_or_create(user_id=user_id)
    api = get_vk_api(access_token)
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
    while offset < count_to_download and (last_message_id is None or last_message_id < current_read):
        response = api.messages.getDialogs(**params)

        for item in response['items']:
            vk_dialogs_list.start_message_id = max(vk_dialogs_list.start_message_id or 0,
                                                   item['in_read'],
                                                   item['out_read']
                                                   )
            if current_read is None:
                current_read = item['in_read']
            else:
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
    user_vk_id = UserModel.objects.filter(pk=user_id).values('vk_id').get()['vk_id']
    vk_messages_history, created = VkMessagesList.objects.get_or_create(dialog=vk_dialog)
    api = get_vk_api(access_token)
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
    while end_message_id is None or current_msg_id >= end_message_id:
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
                attach.is_owner = attach.is_ownered_by(user_vk_id)
                attach.save()
            except IntegrityError:
                pass
        if not response['items']:
            break

        params['start_from'] = response['next_from']
        current_msg_id_str, _ = response['next_from'].split('/')
        current_msg_id = int(current_msg_id_str)

    vk_messages_history.save()


@task
def download_user_documents(access_token, user_id, owner_id=None):
    params = {}
    if owner_id is None:
        vk_docs_list, created = VkDocsList.objects.get_or_create(user_id=user_id, owner_id__isnull=True)
    else:
        vk_docs_list, created = VkDocsList.objects.get_or_create(user_id=user_id, owner_id=owner_id)
        params['owner_id'] = owner_id

    api = get_vk_api(access_token)
    params['count'] = 1
    response = api.docs.get(**params)
    count_to_download = response['count']

    if not created:
        count_to_download -= vk_docs_list.prev_count
        vk_docs_list.prev_count = response['count']
    offset = 0
    params['count'] = VK_DOCS_COUNT

    DocumentAttachment = VkAttachmentFactory.get_for_type('doc')

    while offset < count_to_download:
        response = api.docs.get(**params)

        for item in response['items']:
            try:
                attach = DocumentAttachment.parse_item(item)
                attach.user_id = user_id
                attach.save()
            except IntegrityError:
                pass
        offset += VK_DOCS_COUNT
        params['offset'] = offset

    vk_docs_list.save()


@task
def update_data_on_online_users(time_to_see):
    requests = (UserRequestLog.objects
        .online_users(time_to_see)
        .prefetch_related('user__social_auth').all()
    )
    for r in requests:
        access_token = None
        for backend in r.user.social_auth.all():
            if backend.provider == 'vk-oauth2':
                access_token = backend.get_access_token(load_strategy())
                break
        else:
            continue
        user_id = r.user.pk
        download_dialog_list.apply_async(kwargs={'access_token': access_token, 'user_id': user_id})
        download_user_documents.apply_async(kwargs={'access_token': access_token, 'user_id': user_id})
