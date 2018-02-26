from django.shortcuts import render
from rest_framework import viewsets, permissions
from .models import Folder
from .serializers import FolderSerializer
from rest_api.pagination import ResultsSetPagination

class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all().prefetch_related('author')
    serializer_class = FolderSerializer
