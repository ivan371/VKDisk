from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response

from .models import Folder
from .serializers import FolderSerializer
from django.db.models import Q
from django.http import Http404


class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all().prefetch_related('author')
    serializer_class = FolderSerializer

    def perform_create(self, serializer):
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                serializer.save(root_id=int(self.request.query_params['folder']), type='folder', author=self.request.user)
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
            q = q.filter(root=None).filter(type='folder')
        return q
