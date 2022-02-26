from rest_framework import generics, viewsets
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import RegisterSerializer, UserProfileSerializer
from .models import UserProfile


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
