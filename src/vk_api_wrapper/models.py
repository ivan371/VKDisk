from django.conf import settings
from django.db import models


class VkDialogsList(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_message_id = models.BigIntegerField(default=None, null=True, blank=False)


class VkDialog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=1023,)
    chat_id = models.IntegerField(default=None, null=True)
    is_chat = models.BooleanField(default=True)

    class Meta:
        unique_together = (('user', 'chat_id'), )

    @staticmethod
    def parse_message(message):
        dialog = VkDialog()
        dialog.title = message['title']
        dialog.chat_id = message.get('chat_id', None)
        if dialog.chat_id is None:
            dialog.chat_id = message.get('user_id', None)
            dialog.is_chat = False
        return dialog
