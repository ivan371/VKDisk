from django.db.models.signals import post_save

from vk_api_wrapper.models import VkDialog
from .models import ChatFolder


def create_chat_folder_on_vk_dialog_created(sender, instance, created, *args, **kwargs):
    if created:
        ChatFolder.objects.create(
            title=instance.title,
            author_id=instance.user_id,
            type='chat',
            typeForElasticSearchPleaseDontTouchMe='chat',
            vk_dialog=instance,
            icon=instance.photo
        )


post_save.connect(create_chat_folder_on_vk_dialog_created, VkDialog)
