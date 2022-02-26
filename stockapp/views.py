from rest_framework import viewsets, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Stock
from .serializers import StockSerializer


class StockViewSet(viewsets.ModelViewSet):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    permission_classes = [permissions.IsAuthenticated, ]
    authentication_classes = [JWTAuthentication, ]

    def get_queryset(self):
        user = self.request.user
        return Stock.objects.filter(author=user).all()
