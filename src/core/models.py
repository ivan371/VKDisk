# coding: utf-8

from __future__ import unicode_literals
from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    avatar = models.ImageField(u'фото', blank=True, upload_to=u'avatars', default='avatars/default-avatar.png')

    class Meta:
        verbose_name = u'пользователь'
        verbose_name_plural = u'пользователи'

    def __str__(self):
        return self.username


class Dated(models.Model):
    created = models.DateTimeField(auto_now_add=True, verbose_name=u'время отправления')

    class Meta:
        verbose_name = u'отправлено'
        verbose_name_plural = u'отправлены'
        abstract = True


class Named(models.Model):
    title = models.CharField(max_length=128, blank=False, default=None, verbose_name=u'название')

    def get_title(self):
        return self.title

    class Meta:
        abstract = True
        verbose_name = u'названный'
        verbose_name_plural = u'названные'


class Authored(models.Model):
    author = models.ForeignKey(User, verbose_name=u'отправитель')

    class Meta:
        abstract = True
        verbose_name = u'отправленный'
        verbose_name_plural = u'отправленные'