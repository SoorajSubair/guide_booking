from django.urls import path
from .views import *

from rest_framework_simplejwt.views import (
    TokenRefreshView,TokenVerifyView
)


urlpatterns = [
    path('user_otp/', user_otp, name='user_otp'),
    path('otp_confirm/', otp_confirm, name='otp_confirm'),
    path('create_user/', create_user, name='create_user'),
    path('get_users/', get_users, name='get_users'),
    path('block_user/<int:user_id>', block_user, name='block_user'),
    path('create_guide/', create_guide, name='create_guide'),
    path('get_guides/', get_guides, name='get_guides'),
    path('get_guide/<int:pk>', get_guide, name='get_guide'),
    path('update_guide/<int:pk>', update_guide, name='update_guide'),
    path('create_destination/', create_destination, name='create_destination'),
    path('get_destinations/', get_destinations, name='get_destinations'),
    path('get_top5MegaCity/', get_top5MegaCity, name='get_top5MegaCity'),
    path('get_top5NatureFriendly/', get_top5NatureFriendly, name='get_top5NatureFriendly'),
    path('view_destination/<int:pk>', view_destination, name='view_destination'),
    path('update_destination/<int:pk>', update_destination, name='update_destination'),
    path('delete_destination/<int:destination_id>', delete_destination, name='delete_destination'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]