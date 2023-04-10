from django.db import models
from django.contrib.auth.models import AbstractUser
# from django.contrib.postgres.fields import JSONField
from django.db.models import JSONField
from decimal import Decimal
from django.db.models import Max



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
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, null=True, blank=True)
    wallet = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)

    def __str__(self):
        return self.username
    

class Booking(models.Model):
    guide = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookings_as_guide')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookings_as_user')
    destination = models.ForeignKey(Destination, models.CASCADE)
    date = models.DateField()
    is_booked = models.BooleanField(default=False)
    payment_id = models.CharField(max_length=100, null=True, blank=True)
    is_declined = models.BooleanField(default=False)
    trip_started = models.BooleanField(default=False)
    trip_ended = models.BooleanField(default=False)
    is_start_code = models.CharField(max_length=6,null=True,blank=True)
    is_end_code = models.CharField(max_length=6,null=True,blank=True)


class Payment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE, related_name='payment')
    is_refunded = models.BooleanField(default=False)
    method = models.CharField(max_length=100)


class GuidePayment(models.Model):
    booking = models.OneToOneField(Booking, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=8, decimal_places=2, null=True, blank=True)
    is_paid = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if not self.pk:
            # Only set the amount field on creation, not on updates
            self.amount = self.booking.destination.fee * Decimal(0.7)
        super().save(*args, **kwargs)

class Chat(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='user')
    guide = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='guide')
    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f'{self.user.username} - {self.guide.username}'
    
    def last_message_time(self):
        latest_message_time = self.messages.aggregate(Max('created_at'))['created_at__max']
        if latest_message_time:
            return latest_message_time
        else:
            return self.created_at


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.sender.username} - {self.content}'


