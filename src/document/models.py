# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Named, Authored, Dated
from folder.models import Folder
from django.utils.translation import ugettext_lazy as _


class Document(Named, Authored, Dated):
    type = models.CharField(max_length=128, blank=False, default=_(u'file'), verbose_name=_(u'file'))
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True, blank=True, verbose_name=_(u"folder"))
    id_source = models.IntegerField(verbose_name=(u'source'))
    id_owner = models.IntegerField(verbose_name=(u'owner'))
    access_token = models.CharField(max_length=128, blank=True, null=True, verbose_name=(u'access_token'))

    def __str__(self):
        return u'[{}] {}'.format(self.pk, self.title)

    def get_author(self):
        return self.author

    class Meta:
        verbose_name = _(u'file')
        verbose_name_plural = _(u'files')