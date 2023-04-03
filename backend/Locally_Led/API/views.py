from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from .permissions import IsGuide
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import *
from rest_framework import status
from .models import *
from django.contrib.auth import get_user_model
from .mixins import Messghandler
import random

User = get_user_model()


# Create your views here.

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['is_superuser'] = user.is_superuser
        token['is_guide'] = user.is_guide
        token['image'] = user.image.url if user.image else None
        
        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def user_otp(request):

    if request.method == 'POST':
        phone = request.data['phone']
        user = User.objects.get(phone = phone)
        if user and user.is_active:
            otp = random.randint(1000, 9999)
            try:
                message_handler = Messghandler(phone, otp).send_otp_on_phone()
                return Response('OTP sends successfully', status=200)
            except:
                return Response('OTP service is currently unavailable', status=201)
        else:
            return Response('Phone number is nor registered!', status=400)
    
    
@api_view(['POST'])
def otp_confirm(request):

    if request.method == 'POST':
        otp = request.data['otp']
        phone = request.data['phone']
        validate = Messghandler(phone, otp).validate()
        if validate == "approved":
            user = User.objects.get(phone = phone)
            serializer = MyTokenObtainPairSerializer()
            tokens = serializer.get_token(user)
            access_token = str(tokens.access_token)
            refresh_token = str(tokens)
            response_data = {
                'refresh': refresh_token,
                'access': access_token,
            }
            return Response(response_data, status=200)
        else:
            return Response('not-approved', status=400)

    
    
@api_view(['POST'])
def create_user(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_destination(request):
    if request.method == 'POST':
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            destination = serializer.save()
            images_data = request.FILES.getlist('extra_images')
            for image_data in images_data:
                image_serializer = ExtraDestinationImageSerializer(data={'destination': destination.id, 'image': image_data})
                if image_serializer.is_valid():
                    image_serializer.save() 
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAdminUser])
def update_destination(request, pk):
    try:
        destination = Destination.objects.get(pk=pk)
    except Destination.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DestinationSerializer(destination, data=request.data, partial=True)
    if serializer.is_valid():
        destination = serializer.save()
        images_data = request.FILES.getlist('extra_images')
        for image_data in images_data:
            image_serializer = ExtraDestinationImageSerializer(data={'destination': destination.id, 'image': image_data})
            if image_serializer.is_valid():
                image_serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['GET'])
def get_destinations(request):
    if request.method == 'GET':
        destinations = Destination.objects.all().order_by('-id')
        destinations = DestinationGetSerializer(destinations,many=True)

        return Response(destinations.data, status = status.HTTP_200_OK)
    
@api_view(['GET'])
def get_top5MegaCity(request):
    if request.method == 'GET':
        destinations = Destination.objects.filter(type = 'Mega City').order_by('id')[:5]
        destinations = DestinationGetSerializer(destinations,many=True)

        return Response(destinations.data, status = status.HTTP_200_OK)

@api_view(['GET'])
def get_top5NatureFriendly(request):
    if request.method == 'GET':
        destinations = Destination.objects.filter(type = 'Nature Friendly').order_by('id')[:5]
        destinations = DestinationGetSerializer(destinations,many=True)

        return Response(destinations.data, status = status.HTTP_200_OK)
    
@api_view(['GET'])
def view_destination(request, pk):
    try:
        destination = Destination.objects.get(pk=pk)
    except Destination.DoesNotExist:
        return Response(status=404)

    serializer = DestinationGetSerializer(destination)
    return Response(serializer.data, status = status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_guide(request):
    if request.method == 'POST': 
        destination_id = request.data.pop('destination', None)
        destination = Destination.objects.get(id = destination_id)
        print(destination)
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['is_guide'] = True
            serializer.validated_data['destination'] = destination
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

        
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    if request.method == 'GET':
        # users = User.objects.filter(is_superuser=False).exclude(guides__isnull=False)
        users = User.objects.filter(is_superuser=False, is_guide = False).order_by('-id')
        users = CustomUserSerializer(users, many=True)
        return Response(users.data, status = status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def block_user(request, user_id):
    if request.method == 'GET':
        user = User.objects.get(id = user_id)
        user.is_active = not user.is_active
        user.save()
        return Response({"message": "success"}, status = status.HTTP_200_OK)
       
@api_view(['GET'])
# @permission_classes([IsAdminUser])
def get_guides(request):
    if request.method == 'GET':
        # guides = Guides.objects.all()
        # guides = GuideSerializer(guides, many = True)
        guides = User.objects.filter(is_guide = True).order_by('-id')
        guides = CustomUserSerializer(guides, many=True)
        return Response(guides.data, status = status.HTTP_200_OK)
    
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_destination(request, destination_id):
    if request.method == 'DELETE':
        destination = Destination.objects.get(id = destination_id)
        destination.delete()
        return Response({"message": "success"}, status = status.HTTP_200_OK)
    

@api_view(['GET'])
def get_guide(request, pk):
    try:
        guide = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return Response(status=404)

    guide = CustomUserSerializer(guide)
    return Response(guide.data, status = status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsGuide])
def update_guide(request, pk):
    try:
        guide = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
   
    serializer = CustomUserSerializer(guide, data=request.data, partial=True)
    if serializer.is_valid():
        guide = serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def draft_booking(request):
    user_id = request.data.get('user')
    guide_id = request.data.get('guide')
    destination_id = request.data.get('destination')
    date = request.data.get('date')
    print(date)
    user = CustomUser.objects.get(id = user_id)
    guide = CustomUser.objects.get(id = guide_id)
    destination = Destination.objects.get(id = destination_id)
    try:
        booking = Booking.objects.get(user=user, is_booked=False)
        booking.guide = guide
        booking.destination = destination
        booking.date = date
        booking.save()
        serializer = BookingSerializer(booking)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except:
        serializer = BookingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_booking(request, pk):
    try:
        user = CustomUser.objects.get(id = pk)
        booking = Booking.objects.get(user=user, is_booked=False)
        serializer = BookingGetSerializer(booking)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except:
        return Response('no draft booking', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
def payment_confirmed(request, pk):
    booking = Booking.objects.get(id = pk)
    booking.is_booked = True
    booking.is_start_code = random.randint(100000, 999999)
    booking.save()
    payment = Payment.objects.create(booking=booking, method='PayPal')
    serializer = PaymentSerializer(payment)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_all_bookings(request, pk):
    user = CustomUser.objects.get(id = pk)
    bookings = Booking.objects.filter(user = user, is_booked = True, is_declined=False, trip_ended=False).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_cancelled_bookings(request, pk):
    user = CustomUser.objects.get(id = pk)
    bookings = Booking.objects.filter(user = user, is_booked = True, is_declined=True).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_completed_bookings(request, pk):
    user = CustomUser.objects.get(id = pk)
    bookings = Booking.objects.filter(user = user, is_booked = True, trip_ended=True).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def cancel_booking(request, pk):
    booking = Booking.objects.get(id = pk).order_by('date')
    booking.is_declined = True
    booking.save()
    return Response("Trip Cancelled", status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_guide_upcomming_bookings(request, pk):
    guide = CustomUser.objects.get(id = pk)
    bookings = Booking.objects.filter(guide = guide, is_booked = True, trip_started = False).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_guide_completed_bookings(request, pk):
    guide = CustomUser.objects.get(id = pk)
    bookings = Booking.objects.filter(guide = guide, is_booked = True, trip_ended = True).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_guide_current_bookings(request, pk):
    guide = CustomUser.objects.get(id = pk)
    bookings = Booking.objects.filter(guide = guide, is_booked = True, trip_started = True, trip_ended = False).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsGuide])
def start_trip(request, pk):
    trip = Booking.objects.get(id = pk)
    code = request.data.get('code')
    if code == trip.is_start_code:
        trip.trip_started=True
        trip.is_end_code = random.randint(100000, 999999)
        trip.save()
        return Response("Trip Started", status = status.HTTP_200_OK)
    return Response('Incorrect Code', status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsGuide])
def end_trip(request, pk):
    trip = Booking.objects.get(id = pk)
    code = request.data.get('code')
    if code == trip.is_end_code:
        trip.trip_ended=True
        trip.save()
        guide_payment = GuidePayment.objects.create(booking=trip)
        serializer = GuidePaymentSerializer(guide_payment)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response("incorrect code", status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_scheduled_bookings(request):
    bookings = Booking.objects.filter(is_booked = True, trip_started = False).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_active_bookings(request):
    bookings = Booking.objects.filter(is_booked = True, trip_started = True, trip_ended = False).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_completed_bookings(request):
    bookings = Booking.objects.filter(is_booked = True, trip_ended = True).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_canceled_bookings(request):
    bookings = Booking.objects.filter(is_booked = True, is_declined=True).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def received_payments(request):
    payments = Payment.objects.filter(is_refunded=False, booking__is_declined=False).order_by('-id')
    if payments:
        serializer = PaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def refunded_payments(request):
    payments = Payment.objects.filter(is_refunded=True).order_by('-id')
    if payments:
        serializer = PaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def pending_refunds(request):
    payments = Payment.objects.filter(is_refunded=False, booking__is_declined=True).order_by('-id')
    if payments:
        serializer = PaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def paid_payments(request):
    payments = GuidePayment.objects.filter(is_paid=True).order_by('-id')
    if payments:
        serializer = GuidePaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def pending_payments(request):
    payments = GuidePayment.objects.filter(is_paid=False).order_by('-id')
    if payments:
        serializer = GuidePaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def pay_refund(request, pk):
    payment = Payment.objects.get(id = pk)
    user = payment.booking.user
    amount = payment.booking.destination.fee
    user.wallet = user.wallet + amount
    user.save()
    payment.is_refunded = True
    payment.save()
    return Response("refunded", status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def pay_payment(request, pk):
    payment = GuidePayment.objects.get(id = pk)
    guide = payment.booking.guide
    amount = payment.amount
    guide.wallet = guide.wallet + amount
    guide.save()
    payment.is_paid = True
    payment.save()
    return Response("paid", status = status.HTTP_200_OK)






    







        



