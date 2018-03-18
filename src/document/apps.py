from django.apps import AppConfig


class DocumentConfig(AppConfig):
    name = 'document'

    def ready(self):
        from . import handlers
        from . import search_indexes
