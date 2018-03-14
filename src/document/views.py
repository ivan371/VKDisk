from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import DocumentSerializer, DocumentBulkSerializer
from .models import Document, DocumentData
from django.http import Http404
from datetime import datetime
import re
from rest_framework.pagination import PageNumberPagination
from elasticsearch import Elasticsearch, RequestsHttpConnection
from rest_framework_elasticsearch import es_views, es_filters
from .search_indexes import DocumentIndex


class MediumResultsSetPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 1000


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all().select_related('folder', 'vk_doc')
    serializer_class = DocumentSerializer
    pagination_class = MediumResultsSetPagination

    def add_docs(self, documents):
        if 'folder' in self.request.query_params:
            doc_list = [Document(
                folder_id=int(self.request.query_params['folder']),
                author=self.request.user,
                title=d.title,
                vk_doc_id=d.vk_doc_id
            )
                for d in documents
            ]
        else:
            doc_list = [Document(
                folder=None,
                author=self.request.user,
                title=d.title,
                vk_doc_id=d.vk_doc_id
            )
                for d in documents
            ]
        Document.objects.bulk_create(doc_list)

    def get_serializer_class(self):
        if self.request.method == 'POST' \
                and ('bulk_create' in self.request.query_params or 'bulk_update' in self.request.query_params):
            return DocumentBulkSerializer
        return DocumentSerializer

    def perform_create(self, serializer):
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                if 'bulk_create' in self.request.query_params:
                    self.add_docs(serializer.validated_data.pop('docs'))
                elif 'bulk_update' in self.request.query_params:
                    docs_ids = [doc.id for doc in serializer.validated_data.pop('docs')]
                    Document.objects.filter(id__in=docs_ids).update(folder_id=self.request.query_params['folder'])
                else:
                    if 'file' in self.request.query_params:
                        if self.request.query_params['file'].isdigit():
                            d = Document.objects.get(id=self.request.query_params['file'])
                            serializer.save(
                                folder_id=int(self.request.query_params['folder']),
                                author=self.request.user,
                                id_owner=d.id_owner,
                                id_source=d.id_source,
                                vk_doc_id=d.vk_doc_id
                            )
        elif 'root' in self.request.query_params:
            if 'bulk_create' in self.request.query_params:
                self.add_docs(serializer.validated_data.pop('docs'))
            else:
                if 'file' in self.request.query_params:
                    if self.request.query_params['file'].isdigit():
                        d = Document.objects.get(id=self.request.query_params['file'])
                        serializer.save(
                            folder=None,
                            author=self.request.user,
                            id_owner=d.id_owner,
                            id_source=d.id_source,
                            vk_doc_id=d.vk_doc_id
                        )
        else:
            raise Http404

    def get_queryset(self):
        q = super(DocumentViewSet, self).get_queryset().filter(author=self.request.user)
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                q = q.filter(folder=self.request.query_params['folder'])
        if 'order' in self.request.query_params:
            if self.request.query_params['order'] == 'title':
                q = q.order_by('title')
        if 'root' in self.request.query_params:
            q = q.filter(folder__type='chat')
        if 'filter' in self.request.query_params:
            if 'date' in self.request.query_params:
                if re.match(r'\d\d\d\d-\d\d-\d\d', self.request.query_params['date']):
                    d = datetime.strptime(self.request.query_params['date'], '%Y-%m-%d')
                    q = q.filter(created__lte=d)
            if 'extension' in self.request.query_params:
                if self.request.query_params['extension']:
                    q = q.filter(title__endswith='.{}'.format(self.request.query_params['extension']))
            if 'name' in self.request.query_params:
                if self.request.query_params['name']:
                    q = q.filter(title__istartswith=self.request.query_params['name'])
        return q


class DocumentView(es_views.ListElasticAPIView):
    es_client = Elasticsearch(hosts=['localhost:9200/'],
                              connection_class=RequestsHttpConnection)
    es_model = DocumentIndex
    es_filter_backends = (
        es_filters.ElasticFieldsFilter,
        es_filters.ElasticSearchFilter
    )
    es_filter_fields = (
        es_filters.ESFieldFilter('text', 'title'),
    )
    es_search_fields = (
        'text',
        'title',
    )