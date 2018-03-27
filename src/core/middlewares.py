from .models import UserRequestLog


class RequestLoggerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):

        response = self.get_response(request)

        UserRequestLog.objects.create(user=request.user)

        return response
