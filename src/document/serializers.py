from .models import Document
from rest_framework import serializers, viewsets, fields
from core.serializers import UserSerializer
from folder.serializers import FolderSerializer

class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    folder = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    id_owner = serializers.IntegerField(read_only=True)
    id_source = serializers.IntegerField(read_only=True)
    vk_url = fields.SerializerMethodField('get_url')

    class Meta:
        model = Document
        fields = ('id', 'title', 'author', 'folder', 'type', 'id_owner', 'id_source', 'vk_url')

    def get_url(self, obj):
        base, query = obj.vk_doc.url.split("?")
        query = query.split("&")
        for i in range(len(query)):
            if "no_preview" in query[i]:
                query.pop(i)
                break
        query = "&".join(query)
        return base + "?" + query
