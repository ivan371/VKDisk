# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Named, Authored, Dated
from folder.models import Folder


class Document(Named, Authored, Dated):
    type = models.CharField(max_length=128, blank=False, default='файл', verbose_name=u'файл')
    folder = models.ForeignKey(Folder, on_delete=models.CASCADE, verbose_name="папка")

    def __str__(self):
        return u'[{}] {}'.format(self.pk, self.title)

    def get_author(self):
        return self.author

    class Meta:
        verbose_name = u'файл'
        verbose_name_plural = u'файлы'