# -*- coding: utf-8 -*-
from django.conf.urls import url
from django.urls import path, re_path
from .views import LoginView
from core.views import index, oAuthUrls

urlpatterns = [
    url(r'^oauth_urls/', oAuthUrls, name='oauth_urls'),
    url(r'^login/$', LoginView.as_view(template_name='core/login.html'), name='login'),
    re_path('^', index, name='index'),
]
