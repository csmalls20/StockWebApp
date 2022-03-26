from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile,Stock


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password']
        extra_kwargs = {'password': {
            'write_only': True
        }}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], password=validated_data['password'])
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    user_id = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'first_name',
                  'last_name', 'profile_pic', 'user_id']

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'