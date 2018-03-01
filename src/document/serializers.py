from .models import Document
from rest_framework import serializers


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    folder = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Document
        fields = ('id', 'title', 'author', 'folder')
        read_only_fields = ('id_owner', 'id_source', 'type')