from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from social_django.utils import load_strategy

from vk_api_wrapper.tasks import download_dialog_history
from .models import VkDialog

UserModel = get_user_model()


# def on_user_create_load_dialogs(sender, instance, created, *args, **kwargs):
#     if created:
#         social = instance.social_auth.get(provider='vk-oauth2')
#         if not social:
#             print("can't get social auth info")
#         access_token = social.extra_data['access_token']
#         user_id = instance.pk
#         download_dialog_list.apply_async(kwargs={'access_token': access_token, 'user_id': user_id})


# post_save.connect(on_user_create_load_dialogs, UserModel)

def on_dialog_create_load_files(sender, instance, created, *args, **kwargs):
    if created:
        social = instance.user.social_auth.get(provider='vk-oauth2')
        if not social:
            print("can't get social auth info")
        access_token = social.get_access_token(load_strategy())
        chat_id = instance.chat_id
        is_chat = instance.is_chat
        user_id = instance.user_id
        download_dialog_history.apply_async(kwargs={
            'access_token': access_token,
            'user_id': user_id,
            'chat_id': chat_id,
            'is_group_chat': is_chat
        })


# post_save.connect(on_dialog_create_load_files, VkDialog)
