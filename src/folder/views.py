from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Folder
from .serializers import FolderSerializer, FolderBulkSerializer, FolderTransferSerializer, FolderRecursiveSerializer, \
    FolderSimpleSerializer
from django.db.models import Q
from django.http import Http404


class MiddleResultsSetPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = 'page_size'
    max_page_size = 1000


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 1000
    page_size_query_param = 'page_size'
    max_page_size = 1000


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all().prefetch_related('author', 'folder_set', 'folder_set__root')
    serializer_class = FolderSerializer

    def get_pagination_class(self):
        if 'root' in self.request.query_params or 'large' in self.request.query_params:
            return LargeResultsSetPagination
        return MiddleResultsSetPagination

    def add_folders(self, folders):
        folder_list = [Folder(
            root_id=int(self.request.query_params['folder']),
            type='folder',
            author=self.request.user,
            title=f.title,
        )
            for f in folders
        ]
        Folder.objects.bulk_create(folder_list)

    def get_serializer_class(self):
        if self.request.method == 'POST' \
                and ('bulk_create' in self.request.query_params or 'bulk_update' in self.request.query_params):
            return FolderBulkSerializer
        if self.request.method == 'PUT' and 'replace' in self.request.query_params:
            return FolderTransferSerializer
        if 'recursive' in self.request.query_params and self.request.method == 'GET':
            return FolderRecursiveSerializer
        if self.request.method == 'GET':
            return FolderSerializer
        return FolderSimpleSerializer

    def perform_create(self, serializer):
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                if 'bulk_create' in self.request.query_params:
                    self.add_folders(serializer.validated_data.pop('folders'))
                elif 'bulk_update' in self.request.query_params:
                    folders_ids = [folder.id for folder in serializer.validated_data.pop('folders')]
                    Folder.objects.filter(id__in=folders_ids).update(root_id=self.request.query_params['folder'])
                else:
                    serializer.save(root_id=int(self.request.query_params['folder']),
                                    type='folder',
                                    author=self.request.user)
        elif 'chats' in self.request.query_params:
            serializer.save(root=None, type='chat', author=self.request.user)
        elif 'root' in self.request.query_params:
            serializer.save(root=None, type='folder', author=self.request.user)
        else:
            raise Http404

    def get_queryset(self):
        q = super(FolderViewSet, self).get_queryset().filter(author=self.request.user)
        self.pagination_class = self.get_pagination_class()
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                q = q.filter(root_id=int(self.request.query_params['folder']))
        if 'type' in self.request.query_params:
            q = q.filter(type=self.request.query_params['type'])
        if 'root' in self.request.query_params:
            q = q.filter(type='folder')
        if 'filter' in self.request.query_params:
            if 'name' in self.request.query_params:
                if self.request.query_params['name']:
                    q = q.filter(title__istartswith=self.request.query_params['name'])
        if 'sort' in self.request.query_params:
            if self.request.query_params['sort'] == 'title':
                if 'reverse' in self.request.query_params:
                    q = q.order_by('-title')
                else:
                    q = q.order_by('title')
            if self.request.query_params['sort'] == 'created':
                if 'reverse' in self.request.query_params:
                    q = q.order_by('-id')
                else:
                    q = q.order_by('id')
        else:
            q = q.order_by('-created')
        return q
