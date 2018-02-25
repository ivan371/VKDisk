from django.shortcuts import render
from rest_framework import viewsets
from .models import Folder
from .serializers import FolderSerializer

class FolderViewSet(viewsets.ModelViewSet):
    queryset = Folder.objects.all().prefetch_related('author')
    serializer_class = FolderSerializer
