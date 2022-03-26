from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import RegisterSerializer, UserProfileSerializer,StockSerializer
from .models import UserProfile,Stock
from rest_framework.decorators import api_view,authentication_classes,permission_classes
import json
import requests

class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({'user': RegisterSerializer(user, context=self.get_serializer_context()).data, 'message': 'User Created Successfully'})


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated, ]
    authentication_classes = [JWTAuthentication, ]

    def get_queryset(self):
        user = self.request.user
        user_profile = UserProfile.objects.filter(user=user).all()

        return user_profile


class CheckAuthenticatedView(APIView):
    permission_classes = [IsAuthenticated, ]

    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'success': 'isAuthenticated'})
            else:
                return Response({'error': 'User Not Authenticated'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def addStock(request,format=None):
    isAuthenticated = request.user.is_authenticated
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    if isAuthenticated:
        print(request.user)
        curruser=UserProfile.objects.get(id=request.user.id)
        obj, created = Stock.objects.update_or_create(
            symbol = body['symbol'],
            defaults={
                'user': curruser,
                'shares': body['shares'],
                'broughtPPS': body['broughtPPS']
            }
        )
        obj.save()
        print("Object: ", obj)
        print("Created: ", created)
        content = {
            "Created: ", created
        }
    else:
        content={
            'user': 'unknown'
        }
    return Response(content)

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getStocks(request,format=None):
    isAuthenticated = request.user.is_authenticated
    stocks=[]
    if isAuthenticated:
        user=UserProfile.objects.get(id=request.user.id)
        data=Stock.objects.filter(user=user)
        serializer=StockSerializer(data,many=True)
        stocks=serializer.data
        for x in stocks:
            my_headers = {
                'Content-Type' : 'application/json',
                'x-api-key': 'LsprnNVi5G7KA8siNAbkr63lB1ysS46X6HgkUzw6'
            }
            response = requests.get("https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols="+x['symbol'],headers=my_headers)
            result=response.json()
            currPrice=result['quoteResponse']
            x['currPPS']=float(currPrice['result'][0]['regularMarketPrice'])
            x['amount']=x['currPPS']*float(x['shares'])
            x['broughtPPS']=float(x['broughtPPS'])

    return Response(stocks)