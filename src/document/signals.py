from django.db.models.signals import pre_save, post_delete, post_init, post_save
from django.dispatch import receiver
from .serializers import DocumentDataSerializer
from .models import Document
from elasticsearch import Elasticsearch, RequestsHttpConnection


@receiver(post_save, sender=Document, dispatch_uid="update_record")
def update_es_record(sender, instance, **kwargs):
    obj = DocumentDataSerializer(instance)
    obj.id_elastic = str(instance.id)
    print(obj.id_elastic, instance.id, instance.pk, instance, obj)
    obj.save(using=Elasticsearch(hosts=['localhost:9200/'],connection_class=RequestsHttpConnection))


@receiver(post_delete, sender=Document, dispatch_uid="delete_record")
def delete_es_record(sender, instance, *args, **kwargs):
    obj = DocumentDataSerializer(instance)
    obj.delete(using=Elasticsearch(hosts=['localhost:9200/'],connection_class=RequestsHttpConnection), ignore=404)

