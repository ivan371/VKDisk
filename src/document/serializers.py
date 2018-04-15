from __future__ import absolute_import
from folder.serializers import FolderSerializer

from folder.models import Folder
from .search_indexes import DocumentIndex
from .models import Document
from rest_framework import serializers, fields
from rest_framework_elasticsearch.es_serializer import ElasticModelSerializer


class DocumentFilteredPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(DocumentFilteredPrimaryKeyRelatedField, self).get_queryset()
        if not request or not queryset:
            return None
        return queryset.filter(author=request.user)


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    vk_url = fields.SerializerMethodField('get_url')
    folder = FolderSerializer(many=False, read_only=True)

    class Meta:
        model = Document
        fields = ('id', 'title', 'author', 'folder', 'vk_url')
        read_only_fields = ('id_owner', 'id_source', 'type')

    def get_url(self, obj):
        base, query = obj.vk_doc.url.split("?")
        query = query.split("&")
        for i in range(len(query)):
            if "no_preview" in query[i]:
                query.pop(i)
                break
        query = "&".join(query)
        return base + "?" + query


class DocumentTransferSerializer(serializers.ModelSerializer):

    class Meta:
        model = Document
        fields = ('id', 'folder')


class DocumentBulkSerializer(serializers.ModelSerializer):
    docs = DocumentFilteredPrimaryKeyRelatedField(many=True, queryset=Document.objects.all(), write_only=True)

    class Meta:
        model = Document
        fields = ('id', 'docs')


class ElasticFolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Folder
        fields = ('id', 'typeForElasticSearchPleaseDontTouchMe')


class DocumentDataSerializer(ElasticModelSerializer):
    folder = ElasticFolderSerializer()

    class Meta:
        model = Document
        es_model = DocumentIndex
        fields = ('id', 'id_elastic', 'title', 'text', 'created', 'folder')
