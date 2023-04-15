from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(CustomUser),
admin.site.register(Destination),
admin.site.register(ExtraDestinationImage),
admin.site.register(Booking),
admin.site.register(Payment),
admin.site.register(GuidePayment),
admin.site.register(Chat),
admin.site.register(Message),
admin.site.register(Comment),
