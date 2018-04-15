import logging
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from .serializers import DocumentDataSerializer
from .models import Document
from .elastic_search import es_client


logger = logging.getLogger(__name__)


@receiver(post_save, sender=Document, dispatch_uid="update_record")
def update_es_record(sender, instance, **kwargs):
    try:
        obj = DocumentDataSerializer(instance)
        obj.id_elastic = str(instance.id)
        print(obj.id_elastic, instance.id, instance.pk, instance, obj)
        obj.save(using=es_client)
    except Exception as ex:
        logger.error("Exception on update_es_record", ex)
        pass


@receiver(post_delete, sender=Document, dispatch_uid="delete_record")
def delete_es_record(sender, instance, *args, **kwargs):
    try:
        obj = DocumentDataSerializer(instance)
        obj.delete(using=es_client, ignore=404)
    except Exception as ex:
        logger.error("Exception on delete_es_record", ex)
        pass
