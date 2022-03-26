from django.urls import path, include
from rest_framework import routers
from .views import RegisterView, UserProfileViewSet, CheckAuthenticatedView,addStock,getStocks
from . import views


router = routers.DefaultRouter()
router.register('profile', UserProfileViewSet, basename='profile')


urlpatterns = [
    path('', include(router.urls)),
    path('register', RegisterView.as_view()),
    path('authenticated', CheckAuthenticatedView.as_view()),
    path('addStock',addStock),
    path('getStocks',getStocks)
]
