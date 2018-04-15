from django.contrib.auth.views import LoginView as BaseLoginView, login
from django.shortcuts import render
from django.urls import reverse_lazy, reverse
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from social_django.utils import psa

from .forms import AuthenticationForm


class LoginView(BaseLoginView):
    form_class = AuthenticationForm

    def __init__(self, **kwargs):
        super(LoginView, self).__init__(**kwargs)


# @psa('social:complete')
# def register_by_access_token(request, backend):
#     # This view expects an access_token GET parameter, if it's needed,
#     # request.backend and request.strategy will be loaded with the current
#     # backend and strategy.
#     token = request.POST.get('access_token')
#     user = request.backend.do_auth(token)
#     if user:
#         login(request, user)
#         return 'OK'
#     else:
#         return 'ERROR'

def index(request):
    return render(request, 'core/index.html')


class oAuthUrls(APIView):

    permission_classes = (permissions.AllowAny, )

    def get(self, request):
        if request.user.is_authenticated:
            response_object = {
                'status': 'ok',
            }
        else:
            response_object = {
                'status': 'auth',
                'vk_url': reverse('social:begin', kwargs={'backend': 'vk-oauth2'})
            }
        return Response(response_object)
