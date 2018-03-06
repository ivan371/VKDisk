from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from .models import Folder
from .serializers import FolderSerializer, FolderBulkSerializer
from django.db.models import Q
from django.http import Http404


class LargeResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all().prefetch_related('author')
    serializer_class = FolderSerializer
    pagination_class = LargeResultsSetPagination

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
        return FolderSerializer

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
        q = super(FolderViewSet, self).get_queryset()
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                q = q.filter(root_id=int(self.request.query_params['folder']))
        if 'chats' in self.request.query_params:
            q = q.filter(type='chat')
        if 'root' in self.request.query_params:
            q = q.filter(root=None).exclude(type='chat')
        if 'sorted' in self.request.query_params:
            q = q.filter(type='folder')
        return q
