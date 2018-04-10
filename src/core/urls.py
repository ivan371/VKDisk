# -*- coding: utf-8 -*-
from django.conf.urls import url
from django.contrib.auth.views import LogoutView
from django.urls import path, re_path
from .views import LoginView
from core.views import index, oAuthUrls

urlpatterns = [
    url(r'^oauth_urls/', oAuthUrls.as_view(), name='oauth_urls'),
    url(r'^login/$', LoginView.as_view(template_name='core/login.html'), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    re_path('^', index, name='index'),
]
