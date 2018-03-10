from datetime import datetime
from django.db.models.signals import post_save

from vk_api_wrapper.models import DocAttachment
from .models import Document


def create_document_on_vk_file_created(sender, instance, created, *args, **kwargs):
    if created:
        props = {
            'title': instance.title,
            'author_id': instance.user_id,
            'vk_doc': instance,
            'created': datetime.fromtimestamp(instance.date)
        }
        if instance.vk_dialog and instance.vk_dialog.chatfolder:
            props['folder'] = instance.vk_dialog.chatfolder
        Document.objects.create(**props)


post_save.connect(create_document_on_vk_file_created, DocAttachment)
