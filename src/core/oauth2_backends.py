from social_core.backends.google import GoogleOAuth2 as BaseGoogleOAuth2
from social_core.backends.vk import VKOAuth2 as BaseVKOAuth2
from social_core.utils import url_add_parameters, handle_http_errors


class VKOAuth2(BaseVKOAuth2):
    blank_redirect_uri = "https://oauth.vk.com/blank.html"

    def get_redirect_uri(self, state=None):
        """Build redirect with redirect_state parameter."""
        if state is not None:
            uri = self.blank_redirect_uri
            if self.REDIRECT_STATE and state:
                uri = url_add_parameters(uri, {'redirect_state': state})
        else:
            uri = self.redirect_uri
        return uri

    @handle_http_errors
    def do_auth(self, access_token, *args, **kwargs):
        """Finish the auth process once the access_token was retrieved"""
        data = self.user_data(access_token, *args, **kwargs)
        response = kwargs.get('response') or {}
        response.update(data or {})
        if 'access_token' not in response:
            response['access_token'] = access_token
        kwargs.update({'response': response, 'backend': self})
        return self.strategy.authenticate(*args, **kwargs)

    def auth_extra_arguments(self):
        args = super().auth_extra_arguments()
        args['display'] = 'page'
        return args


class GoogleOAuth2(BaseGoogleOAuth2):
    DEFAULT_SCOPE = ['openid', 'email']


