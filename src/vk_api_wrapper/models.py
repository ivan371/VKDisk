from django.conf import settings
from django.db import models
from django.utils.translation import ugettext_lazy as _


class VkDialogsList(models.Model):

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_message_id = models.BigIntegerField(default=None, null=True, blank=False)


class VkDialog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=1023,)
    photo = models.TextField(default=None, null=True, blank=True)
    chat_id = models.IntegerField(default=None, null=True)
    is_chat = models.BooleanField(default=True)

    class Meta:
        unique_together = (('user', 'chat_id'), )

    @staticmethod
    def parse_message(message):
        dialog = VkDialog()
        dialog.title = message['title']
        dialog.chat_id = message.get('chat_id', None)
        dialog.photo = message.get('photo_50', None)
        if dialog.chat_id is None:
            dialog.chat_id = message.get('user_id', None)
            dialog.is_chat = False
        return dialog


class VkMessagesList(models.Model):

    dialog = models.OneToOneField(VkDialog, on_delete=models.CASCADE)
    start_from = models.BigIntegerField(default=None, null=True, blank=False)


class VkDocsList(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    owner_id = models.BigIntegerField(default=None, null=True, blank=True)
    prev_count = models.BigIntegerField(default=0, null=False, blank=False)

    class Meta:
        unique_together = (('user', 'owner_id'), )


class BaseAttachment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    vk_dialog = models.ForeignKey(VkDialog, null=True, blank=True, on_delete=models.CASCADE)

    class Meta:
        abstract = True

    @staticmethod
    def parse_message(message):
        raise NotImplementedError()

    @staticmethod
    def parse_item(item):
        raise NotImplementedError()

    def is_ownered_by(self, vk_uid):
        raise NotImplementedError()


class VkAttachmentFactory:
    type_dict = {}

    @classmethod
    def register(cls, msg_type, clazz):
        cls.type_dict[msg_type] = clazz

    @classmethod
    def parse_message(cls, message):
        msg_type = message['type']
        clazz = cls.type_dict[msg_type]
        return clazz.parse_message(message)

    @classmethod
    def get_for_type(cls, type_name):
        return cls.type_dict[type_name]


class DocAttachment(BaseAttachment, models.Model):
    DOCUMENT_TYPES = (
        (_('Text document'), 1),
        (_('Archive'), 2),
        (_('Gif'), 3),
        (_('Image'), 4),
        (_('Audio'), 5),
        (_('Video'), 6),
        (_('E-Book'), 7),
        (_('Unknown'), 8),
    )

    vk_id = models.IntegerField()
    vk_owner_id = models.IntegerField()
    vk_access_key = models.CharField(max_length=255)
    title = models.CharField(max_length=1023)
    size = models.IntegerField()
    ext = models.CharField(max_length=63)
    url = models.TextField()
    date = models.BigIntegerField()
    type = models.IntegerField(choices=DOCUMENT_TYPES)

    class Meta:
        unique_together = (('user', 'vk_id', 'vk_owner_id'), )

    @staticmethod
    def parse_message(message):
        doc = message['doc']
        return DocAttachment.parse_item(doc)

    @staticmethod
    def parse_item(doc):
        attach = DocAttachment()
        attach.vk_id = doc['id']
        attach.vk_owner_id = doc['owner_id']
        attach.title = doc['title']
        attach.size = doc['size']
        attach.ext = doc['ext']
        attach.url = doc['url']
        attach.date = doc['date']
        attach.type = doc['type']
        attach.vk_access_key = doc.get('access_key', None)
        return attach

    def is_ownered_by(self, vk_uid):
        return self.vk_owner_id == vk_uid


VkAttachmentFactory.register('doc', DocAttachment)
