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
        if 'folder' and 'file' in self.request.query_params:
            if self.request.query_params['folder'].isdigit() and self.request.query_params['folder'].isdigit():
                d = Document.objects.get(id=self.request.query_params['file'])
                serializer.save(
                    folder_id=int(self.request.query_params['folder']),
                    author=self.request.user,
                    id_owner=d.id_owner,
                    id_source=d.id_source,
                    vk_doc_id=d.vk_doc_id
                )
        else:
            raise Http404

    def get_queryset(self):
        q = super(DocumentViewSet, self).get_queryset()
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                q = q.filter(folder=self.request.query_params['folder'])
        return q