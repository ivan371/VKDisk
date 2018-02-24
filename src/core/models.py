# coding: utf-8

from __future__ import unicode_literals
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import ugettext_lazy as _


class User(AbstractUser):
    avatar = models.ImageField(u'фото', blank=True, upload_to=u'avatars', default='avatars/default-avatar.png')

    class Meta:
        verbose_name = _(u'user')
        verbose_name_plural = _(u'users')

    def __str__(self):
        return self.username


class Dated(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name=_(u'datetime'))

    class Meta:
        verbose_name = _(u'send')
        verbose_name_plural = _(u'send')
        abstract = True


class Named(models.Model):
    title = models.CharField(max_length=128, blank=False, default=None, verbose_name=_(u'title'))

    def get_title(self):
        return self.title

    class Meta:
        abstract = True
        verbose_name = _(u'titled')
        verbose_name_plural = _(u'titled')


class Authored(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_(u'author'))

    class Meta:
        abstract = True
        verbose_name = _(u'authored')
        verbose_name_plural = _(u'authored')