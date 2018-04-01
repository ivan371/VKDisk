from django.db.models.signals import pre_save, post_delete
from django.dispatch import receiver
from .serializers import DocumentDataSerializer
from .models import Document
from elasticsearch import Elasticsearch, RequestsHttpConnection

@receiver(pre_save, sender=Document, dispatch_uid="update_record")
def update_es_record(sender, instance, **kwargs):
    obj = DocumentDataSerializer(instance)
    obj.save(using=Elasticsearch(hosts=['localhost:9200/'],connection_class=RequestsHttpConnection))

@receiver(post_delete, sender=Document, dispatch_uid="delete_record")
def delete_es_record(sender, instance, *args, **kwargs):
    obj = DocumentDataSerializer(instance)
    obj.delete(using=Elasticsearch(hosts=['localhost:9200/'],connection_class=RequestsHttpConnection), ignore=404)