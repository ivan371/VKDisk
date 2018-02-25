from django.contrib.auth.views import LoginView as BaseLoginView
from .forms import AuthenticationForm


class LoginView(BaseLoginView):
    form_class = AuthenticationForm

    def __init__(self, **kwargs):
        super(LoginView, self).__init__(**kwargs)
