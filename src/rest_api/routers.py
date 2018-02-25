from rest_framework import routers
from core.serializers import UserViewSet
from folder.views import FolderViewSet
from document.views import DocumentViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'folders', FolderViewSet)
router.register(r'documents', DocumentViewSet)