from elasticsearch import Elasticsearch, RequestsHttpConnection
from django.conf import settings

es_client = Elasticsearch(hosts=settings.ELASTICSEARCH_HOSTS, connection_class=RequestsHttpConnection)
