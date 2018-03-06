from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import DocumentSerializer, DocumentBulkSerializer
from .models import Document
from django.http import Http404


class DocumentViewSet(viewsets.ModelViewSet):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer

    def add_docs(self, documents):
        doc_list = [Document(
            folder_id=int(self.request.query_params['folder']),
            author=self.request.user,
            title=d.title,
            id_owner=d.id_owner,
            id_source=d.id_source,
            vk_doc_id=d.vk_doc_id
        )
            for d in documents
        ]
        Document.objects.bulk_create(doc_list)

    def get_serializer_class(self):
        if self.request.method == 'POST' \
                and ('bulk_create' in self.request.query_params or 'bulk_update' in self.request.query_params):
            return DocumentBulkSerializer
        return DocumentSerializer

    def perform_create(self, serializer):
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                if 'bulk_create' in self.request.query_params:
                    self.add_docs(serializer.validated_data.pop('docs'))
                elif 'bulk_update' in self.request.query_params:
                    docs_ids = [doc.id for doc in serializer.validated_data.pop('docs')]
                    Document.objects.filter(id__in=docs_ids).update(folder_id=self.request.query_params['folder'])
                else:
                    if 'file' in self.request.query_params:
                        if self.request.query_params['file'].isdigit():
                            d = Document.objects.get(id=self.request.query_params['file'])
                            serializer.save(
                                folder_id=int(self.request.query_params['folder']),
                                author=self.request.user,
                                id_owner=d.id_owner,
                                id_source=d.id_source,
                                vk_doc_id=d.vk_doc_id
                            )
        else:
            raise Http404

    def get_queryset(self):
        q = super(DocumentViewSet, self).get_queryset()
        if 'folder' in self.request.query_params:
            if self.request.query_params['folder'].isdigit():
                q = q.filter(folder=self.request.query_params['folder'])
        return q
