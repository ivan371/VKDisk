from .models import Document
from rest_framework import serializers


class DocumentFilteredPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(DocumentFilteredPrimaryKeyRelatedField, self).get_queryset()
        if not request or not queryset:
            return None
        return queryset.filter(author=request.user, type='folder')


class DocumentSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    folder = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Document
        fields = ('id', 'title', 'author', 'folder')
        read_only_fields = ('id_owner', 'id_source', 'type')


class DocumentBulkSerializer(serializers.ModelSerializer):
    docs = DocumentFilteredPrimaryKeyRelatedField(many=True, queryset=Document.objects.all(), write_only=True)

    class Meta:
        model = Document
        fields = ('id', 'docs')