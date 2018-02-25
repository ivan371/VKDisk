from rest_framework import routers
from core.serializers import UserViewSet
from folder.views import FolderViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'folders', FolderViewSet)