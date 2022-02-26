from django.urls import path, include
from rest_framework import routers
from .views import StockViewSet


router = routers.DefaultRouter()
router.register('', StockViewSet, basename='stock')


urlpatterns = [
    path('', include(router.urls)),
]
