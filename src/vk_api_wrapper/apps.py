from django.apps import AppConfig


class VkApiWrapperConfig(AppConfig):
    name = 'vk_api_wrapper'

    def ready(self):
        from . import handlers
