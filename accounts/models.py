from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    first_name = models.CharField(max_length=50, default='first name')
    last_name = models.CharField(max_length=50, default='last name')
    profile_pic = models.ImageField(
        upload_to='profilepic/', default='../media/profilepic/download.png')
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.first_name + " " + self.last_name + " (" + self.user.username + ")"
