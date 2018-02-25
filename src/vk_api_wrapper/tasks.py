import vk_api
from django.conf import settings
from django.db import IntegrityError

from .models import VkDialogsList, VkDialog


VK_DIALOG_COUNT = 200


def get_user_info(api, user_id):
    response = api.users.get(user_ids=user_id)
    return response[0]


def get_group_info(api, group_id):
    response = api.groups.getById(group_id=group_id)
    return response[0]


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
    if vk_dialogs_list.start_message_id:
        params['start_message_id'] = vk_dialogs_list.start_message_id
        response = api.messages.getDialogs(**params)
        count_to_download -= response['count']
        del params['start_message_id']
    while offset < count_to_download:
        response = api.messages.getDialogs(**params)

        for item in response['items']:
            vk_dialogs_list.start_message_id = max(vk_dialogs_list.start_message_id or 0,
                                                   item['in_read'],
                                                   item['out_read']
                                                   )
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
                dialog.save()
            except IntegrityError:
                pass

        offset += VK_DIALOG_COUNT
        params['offset'] = offset

    vk_dialogs_list.save()
    # response = api.messages.getDialogs(**params)

