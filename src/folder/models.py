# coding: utf-8
from __future__ import unicode_literals

from django.db import models
from core.models import Named, Authored, Dated, User
from django.utils.translation import ugettext_lazy as _

from vk_api_wrapper.models import VkDialog


class Folder(Named, Authored):
    type = models.CharField(choices=((_(u'folder'), u'folder'), (_(u'chat'), u'chat'), (_(u'root'), u'root'),
                                     (_(u'sorted'), u'sorted'), (_(u'favorite'), u'favorite')),
                            max_length=128, default=_(u'folder'), verbose_name=_(u'type of folder'))
    typeForElasticSearchPleaseDontTouchMe = models.CharField(choices=((u'folder', u'folder'), (u'chat', u'chat'), (u'root', u'root'),
                                     (u'sorted', u'sorted'), (u'favorite', u'favorite')),
                            max_length=128, default=u'folder', verbose_name=u'type of folder')
    root = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, verbose_name=_(u'root'))

    icon = models.TextField(default=None, null=True, blank=True)

    def __str__(self):
        return u'[{}] {}'.format(self.pk, self.title)

    def get_author(self):
        return self.author

    class Meta:
        verbose_name = _(u'folder')
        verbose_name_plural = _(u'folders')


class ChatFolder(Folder):
    vk_dialog = models.OneToOneField(VkDialog, on_delete=models.CASCADE)

