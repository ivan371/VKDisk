from .models import Document
from rest_framework import serializers, fields


class DocumentFilteredPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(DocumentFilteredPrimaryKeyRelatedField, self).get_queryset()
        if not request or not queryset:
            return None
        return queryset.filter(author=request.user)


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    folder = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    vk_url = fields.SerializerMethodField('get_url')

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


class DocumentBulkSerializer(serializers.ModelSerializer):
    docs = DocumentFilteredPrimaryKeyRelatedField(many=True, queryset=Document.objects.all(), write_only=True)

    class Meta:
        model = Document
        fields = ('id', 'docs')

