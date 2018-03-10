from django.apps import AppConfig


class FolderConfig(AppConfig):
    name = 'folder'

    def ready(self):
        from . import handlers
