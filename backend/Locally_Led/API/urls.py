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
    path('draft_booking/', draft_booking, name='draft_booking'),
    path('get_booking/<int:pk>', get_booking, name='get_booking'),
    path('get_user_all_bookings/<int:pk>', get_user_all_bookings, name='get_user_all_bookings'),
    path('get_user_cancelled_bookings/<int:pk>', get_user_cancelled_bookings, name='get_user_cancelled_bookings'),
    path('get_user_completed_bookings/<int:pk>', get_user_completed_bookings, name='get_user_completed_bookings'),
    path('cancel_booking/<int:pk>', cancel_booking, name='cancel_booking'),
    path('get_guide_upcomming_bookings/<int:pk>', get_guide_upcomming_bookings, name='get_guide_upcomming_bookings'),
    path('get_guide_completed_bookings/<int:pk>', get_guide_completed_bookings, name='get_guide_completed_bookings'),
    path('get_guide_current_bookings/<int:pk>', get_guide_current_bookings, name='get_guide_current_bookings'),
    path('start_trip/<int:pk>', start_trip, name='start_trip'),
    path('end_trip/<int:pk>', end_trip, name='end_trip'),
    path('all_scheduled_bookings/', all_scheduled_bookings, name='all_scheduled_bookings'),
    path('all_active_bookings/', all_active_bookings, name='all_active_bookings'),
    path('all_completed_bookings/', all_completed_bookings, name='all_completed_bookings'),
    path('all_canceled_bookings/', all_canceled_bookings, name='all_canceled_bookings'),
    path('payment_confirmed/<int:pk>', payment_confirmed, name='payment_confirmed'),
    path('received_payments/', received_payments, name='received_payments'),
    path('refunded_payments/', refunded_payments, name='refunded_payments'),
    path('pending_refunds/', pending_refunds, name='pending_refunds'),
    path('paid_payments/', paid_payments, name='paid_payments'),
    path('pending_payments/', pending_payments, name='pending_payments'),
    path('pay_refund/<int:pk>', pay_refund, name='pay_refund'),
    path('pay_payment/<int:pk>', pay_payment, name='pay_payment'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/verify/', TokenVerifyView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]