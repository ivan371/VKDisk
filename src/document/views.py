from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import DocumentSerializer
from .models import Document
# Create your views here.


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def perform_create(self, serializer):
        serializer.save(folder=self.request.query_params['folder'], author=self.request.user)

    def get_queryset(self):
        q = self.queryset
        if 'folder' in self.request.query_params and self.request.query_params['folder'].isdigit():
            q = q.filter(folder=self.request.query_params['folder'])
        return q