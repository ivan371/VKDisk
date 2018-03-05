from .models import Document
from rest_framework import serializers, viewsets
from core.serializers import UserSerializer
from folder.serializers import FolderSerializer

class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    folder = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    id_owner = serializers.IntegerField(read_only=True)
    id_source = serializers.IntegerField(read_only=True)

    class Meta:
        model = Document
        fields = ('id', 'title', 'author', 'folder', 'type', 'id_owner', 'id_source')