from rest_framework.decorators import list_route
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response

from .models import User
from rest_framework import serializers, viewsets, mixins


# Serializers define the API representation.
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'lang')


class UserViewSet(viewsets.GenericViewSet, mixins.UpdateModelMixin, mixins.RetrieveModelMixin):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @list_route()
    def current(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            raise AuthenticationFailed()
        serializer = self.get_serializer_class()(request.user)
        return Response(serializer.data)
