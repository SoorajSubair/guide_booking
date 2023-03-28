from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.postgres.fields import JSONField
from django.db.models import JSONField


class Destination(models.Model):
    name = models.CharField(max_length=255, unique=True)
    country = models.CharField(max_length=255)
    image = models.ImageField(null=True , blank=True)
    video = models.FileField(null=True, blank=True)
    short_info = models.TextField(max_length=255, null=True, blank=True)
    about = models.TextField()
    type = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
    def guide_count(self):
        return self.customuser_set.count()

    guide_count.short_description = 'Number of Guides'

class ExtraDestinationImage(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, null=True, blank=True)
    image = models.ImageField(null=True , blank=True)

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, unique=True)
    image = models.ImageField(upload_to="images",default="default.jpg")
    is_guide = models.BooleanField(default=False)
    bio = models.TextField(null =True, blank=True)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.username
    

# class Guides(models.Model):
#     user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
#     destination = models.ForeignKey(Destination, on_delete=models.CASCADE)
#     language = JSONField(null=True, blank=True)
#     bio = models.TextField(null = True, blank=True)

#     def __str__(self):
#         return self.user.username
    


