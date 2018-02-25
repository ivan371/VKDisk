# -*- coding: utf-8 -*-
from django.conf.urls import url
from django.urls import path, re_path
from core.views import index

urlpatterns = [
    re_path('^', index, name='index'),
]
