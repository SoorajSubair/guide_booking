from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(CustomUser),
# admin.site.register(Guides),
admin.site.register(Destination),
admin.site.register(ExtraDestinationImage),
