from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import DocumentSerializer
from .models import Document
from django.http import Http404
# Create your views here.


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def perform_create(self, serializer):
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                serializer.save(folder_id=int(self.request.query_params['folder']), author = self.request.user, id_owner = 0, id_source = 0)
        else:
            raise Http404


    def get_queryset(self):
        q = self.queryset
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                q = q.filter(folder=self.request.query_params['folder'])
        return q