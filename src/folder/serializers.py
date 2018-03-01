from .models import Folder
from rest_framework import serializers, viewsets
from core.serializers import UserSerializer


class FolderSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    root = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Folder
        fields = ('id', 'author', 'title', 'root', 'type')