# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Named, Authored, Dated, User
from django.utils.translation import ugettext_lazy as _


class Folder(Named, Authored):
    type = models.CharField(max_length=128, blank=False, default=_(u'folder'), verbose_name=_(u'type of folder'))
    root = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, verbose_name=_(u'root'))

    def __str__(self):
        return u'[{}] {}'.format(self.pk, self.title)

    def get_author(self):
        return self.author

    class Meta:
        verbose_name = _(u'folder')
        verbose_name_plural = _(u'folders')