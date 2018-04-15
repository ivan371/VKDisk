from django.core.paginator import InvalidPage
from django.shortcuts import render
from django.utils import six
from rest_framework import viewsets, permissions

from folder.views import LargeResultsSetPagination
from rest_framework.exceptions import NotFound

from .serializers import DocumentSerializer, DocumentBulkSerializer, DocumentTransferSerializer
from .models import Document#, DocumentData
from django.http import Http404
from datetime import datetime
import re
from rest_framework.pagination import PageNumberPagination
from elasticsearch import Elasticsearch, RequestsHttpConnection
from rest_framework_elasticsearch import es_views, es_filters
from .search_indexes import DocumentIndex
from .elastic_search import es_client


class MediumResultsSetPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 1000


class ElasticPagination(PageNumberPagination):
    page_size = 40
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def _get_count(self, search):
        response = search.execute()

        return response.hits.total

    def paginate_search(self, search, request, view=None):
        page_size = self.get_page_size(request)
        if not page_size:
            return None

        paginator = self.django_paginator_class(search, page_size)
        page_number = request.query_params.get(self.page_query_param, 1)
        if page_number in self.last_page_strings:
            page_number = paginator.num_pages

        try:
            self.page = paginator.page(page_number)
        except InvalidPage as exc:
            msg = self.invalid_page_message.format(
                page_number=page_number, message=six.text_type(exc)
            )
            raise NotFound(msg)

        if paginator.num_pages > 1 and self.template is not None:
            # The browsable API should display pagination controls.
            self.display_page_controls = True

        self.request = request
        return list(self.page)


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all().select_related('folder', 'vk_doc')
    serializer_class = DocumentSerializer

    def get_pagination_class(self):
        if 'large' in self.request.query_params:
            return LargeResultsSetPagination
        return MediumResultsSetPagination

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
                and ('bulk_create' in self.request.query_params
                or 'bulk_update' in self.request.query_params
                or 'bulk_delete' in self.request.query_params):
            return DocumentBulkSerializer
        if self.request.method == 'PUT' and 'replace' in self.request.query_params:
            return DocumentTransferSerializer
        return DocumentSerializer

    def perform_create(self, serializer):
        if 'bulk_delete' in self.request.query_params:
            docs_ids = [doc.id for doc in serializer.validated_data.pop('docs')]
            Document.objects.filter(id__in=docs_ids, author=self.request.user).delete()
        elif 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                if 'bulk_create' in self.request.query_params:
                    self.add_docs(serializer.validated_data.pop('docs'))
                elif 'bulk_update' in self.request.query_params:
                    docs_ids = [doc.id for doc in serializer.validated_data.pop('docs')]
                    Document.objects.filter(id__in=docs_ids, author=self.request.user).update(folder_id=self.request.query_params['folder'])
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
        self.pagination_class = self.get_pagination_class()
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
                    q = q.filter(title__icontains=self.request.query_params['name'])
        if 'sort' in self.request.query_params:
            if self.request.query_params['sort'] == 'name':
                if 'reverse' in self.request.query_params:
                    q = q.order_by('-title')
                else:
                    q = q.order_by('title')
            if self.request.query_params['sort'] == 'date':
                if 'reverse' in self.request.query_params:
                    q = q.order_by('-created')
                else:
                    q = q.order_by('created')
        else:
            q = q.order_by('-created')
        return q


class DocumentView(es_views.ListElasticAPIView):
    es_client = es_client
    es_model = DocumentIndex
    es_filter_backends = (
        es_filters.ElasticFieldsFilter,
        es_filters.ElasticOrderingFilter,
        es_filters.ElasticSearchFilter
    )
    es_ordering_fields = (
        "created",
        ("title.raw", "title"),
        ("id.raw", "id")
    )
    es_filter_fields = (
        es_filters.ESFieldFilter('text', 'text.raw'),
        es_filters.ESFieldFilter('title', 'title.raw'),
        es_filters.ESFieldFilter('folder_id', 'folder.id.raw'),
        es_filters.ESFieldFilter('folder_type', 'folder.typeForElasticSearchPleaseDontTouchMe.raw'),
        es_filters.ESFieldFilter('created', 'created')
    )
    es_search_fields = (
        'text',
        'title',
    )
    es_pagination_class = ElasticPagination
