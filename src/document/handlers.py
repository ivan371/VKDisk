import os
from datetime import datetime
from django.db.models.signals import post_save

from vk_api_wrapper.models import DocAttachment
from .models import Document
from .tasks import load_document_text


def create_document_on_vk_file_created(sender, instance, created, *args, **kwargs):
    if created:
        props = {
            'title': instance.title,
            'author_id': instance.user_id,
            'vk_doc': instance,
            'created': datetime.fromtimestamp(instance.date),
            'is_owner': instance.is_owner
        }
        if instance.vk_dialog and instance.vk_dialog.chatfolder:
            props['folder'] = instance.vk_dialog.chatfolder
        doc = Document.objects.create(**props)
        load_document_text.apply_async(kwargs={
            'doc_id': doc.id,
            'url': instance.url,
            'ext': os.path.splitext(instance.title)[1]
        })


post_save.connect(create_document_on_vk_file_created, DocAttachment)
