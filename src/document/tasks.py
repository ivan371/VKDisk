from celery.task import task
from django.db import transaction

from core.parser import GetText
from document.models import Document


@task
def load_document_text(doc_id, url, ext):
    with transaction.atomic():
        doc = Document.objects.select_for_update().get(pk=doc_id)
        doc.text = GetText(url, ext)
        doc.save()
