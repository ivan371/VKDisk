# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Named, Authored, Dated
from folder.models import Folder
from django.utils.translation import ugettext_lazy as _

from vk_api_wrapper.models import DocAttachment


class Document(Named, Authored, Dated):
    id_elastic = models.CharField(max_length=1024, default="1")
    type = models.CharField(max_length=128, blank=False, default=_(u'file'), verbose_name=_(u'file'))
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, blank=True, verbose_name=_(u"folder"))
    text = models.TextField(null=True)
    vk_doc = models.ForeignKey(DocAttachment, on_delete=models.CASCADE)

    def __str__(self):
        return u'[{}] {}'.format(self.pk, self.title)

    def get_author(self):
        return self.author

    class Meta:
        verbose_name = _(u'file')
        verbose_name_plural = _(u'files')

