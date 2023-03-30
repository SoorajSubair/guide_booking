from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.postgres.fields import JSONField
from django.db.models import JSONField


class Destination(models.Model):
    name = models.CharField(max_length=255, unique=True)
    country = models.CharField(max_length=255)
    image = models.ImageField(null=True , blank=True)
    video = models.FileField(null=True, blank=True)
    fee = models.DecimalField(max_digits=8, decimal_places=2)
    short_info = models.TextField(max_length=255)
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
    

class Booking(models.Model):
    guide = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookings_as_guide')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookings_as_user')
    destination = models.ForeignKey(Destination, models.CASCADE)
    date = models.DateTimeField()
    is_accepted = models.BooleanField(default=False)
    is_declined = models.BooleanField(default=False)
    trip_started = models.BooleanField(default=False)
    trip_ended = models.BooleanField(default=False)
    is_start_code = models.CharField(max_length=6)
    is_end_code = models.CharField(max_length=6)


class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    is_refunded = models.BooleanField(default=False)


class GuidePayment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2)
    is_paid = models.BooleanField(default=False)


