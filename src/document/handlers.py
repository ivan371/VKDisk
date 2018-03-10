from datetime import datetime
from django.db.models.signals import post_save

from vk_api_wrapper.models import DocAttachment
from .models import Document


def create_document_on_vk_file_created(sender, instance, created, *args, **kwargs):
    if created:
        Document.objects.create(
            title=instance.title,
            author_id=instance.user_id,
            vk_doc=instance,
            folder=instance.vk_dialog.chatfolder,
            created=datetime.fromtimestamp(instance.date)
        )


post_save.connect(create_document_on_vk_file_created, DocAttachment)
