from .models import Folder
from rest_framework import serializers, viewsets
from core.serializers import UserSerializer
from rest_framework_recursive.fields import RecursiveField


class FolderFilteredPrimaryKeyRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        request = self.context.get('request', None)
        queryset = super(FolderFilteredPrimaryKeyRelatedField, self).get_queryset()
        if not request or not queryset:
            return None
        return queryset.filter(author=request.user, type='folder')


class FolderSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    root = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    folder_set = RecursiveField(many=True)

    class Meta:
        model = Folder
        fields = ('id', 'author', 'title', 'root', 'type', 'folder_set', 'root')


class FolderRootRecursiveSimpleSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    root = RecursiveField('FolderSerializer', required=False)

    class Meta:
        model = Folder
        fields = ('id', 'author', 'title', 'root', 'type')


class FolderSimpleSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    root = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

    class Meta:
        model = Folder
        fields = ('id', 'author', 'title', 'root', 'type')


class FolderRecursiveSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    folder_set = FolderSimpleSerializer(many=True)
    root = RecursiveField('FolderSerializer', required=False)

    class Meta:
        model = Folder
        fields = ('id', 'author', 'title', 'root', 'type', 'folder_set', 'root')


class FolderTransferSerializer(serializers.ModelSerializer):

    class Meta:
        model = Folder
        fields = ('id', 'root')


class FolderBulkSerializer(serializers.ModelSerializer):
    folders = FolderFilteredPrimaryKeyRelatedField(many=True, queryset=Folder.objects.all(), write_only=True)

    class Meta:
        model = Folder
        fields = ('id', 'folders')
