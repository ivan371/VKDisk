# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Named, Authored, Dated, User


class Folder(Named, Authored):
    type = models.CharField(max_length=128, blank=False, default='папка', verbose_name=u'папка')
    root = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, verbose_name=u'родитель')

    def __str__(self):
        return u'[{}] {}'.format(self.pk, self.title)

    def get_author(self):
        return self.author

    class Meta:
        verbose_name = u'папка'
        verbose_name_plural = u'папки'