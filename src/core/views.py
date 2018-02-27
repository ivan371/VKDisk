from django.contrib.auth.views import LoginView as BaseLoginView, login
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