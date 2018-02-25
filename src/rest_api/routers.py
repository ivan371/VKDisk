from rest_framework import routers
from core.serializers import UserViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)