from rest_framework.decorators import list_route
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from .models import User
from rest_framework import serializers, viewsets, mixins


# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'lang', 'first_name', 'last_name', 'avatar')


class UserViewSet(viewsets.GenericViewSet, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @list_route()
    def current(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            raise AuthenticationFailed()
        return Response(self.get_serializer(request.user).data)
