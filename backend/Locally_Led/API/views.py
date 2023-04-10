# from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser,IsAuthenticated
from .permissions import IsGuide
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .serializers import *
from rest_framework import status
from .models import *
from .classViews import MyTokenObtainPairSerializer
from django.contrib.auth import get_user_model
from .mixins import Messghandler
import random
import razorpay
import json
from datetime import datetime
from django.conf import settings
from django.db.models import Max



User = get_user_model()

        
@api_view(['POST'])
def user_otp(request):

    """
    This API endpoint sends an OTP (One Time Password) to a registered user's phone number.

    Parameters:
    request (HttpRequest): The HTTP request object containing the user's phone number.

    Returns:
    Response: A response object containing a message indicating whether the OTP was sent successfully
              or an error occurred.

    Raises:
    Http404: If the user with the specified phone number is not found.
    """

    if request.method == 'POST':
        phone = request.data['phone']
        user = User.objects.get(phone = phone)
        if user and user.is_active:
            otp = random.randint(100000, 999999)
            try:
                message_handler = Messghandler(phone, otp).send_otp_on_phone()
                return Response('OTP sends successfully', status=200)
            except:
                return Response('OTP service is currently unavailable', status=201)
        else:
            return Response('Phone number is nor registered!', status=400)
    
    
@api_view(['POST'])
def otp_confirm(request):

    """
    This API endpoint validates the OTP (One Time Password) entered by a user, and returns a JWT (JSON Web Token)
    for authenticated access to protected resources.

    Parameters:
    request (HttpRequest): The HTTP request object containing the user's phone number and the OTP entered.

    Returns:
    Response: A response object containing a JSON Web Token (JWT) for authenticated access to protected resources,
              or an error message indicating that the OTP was not approved.

    Raises:
    Http404: If the user with the specified phone number is not found.
    """

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

    """
    Creates a new user with the provided data.

    Args:
        request: The request object containing user data.

    Returns:
        A response object with the created user's data if successful, else
        returns an error response with status 400.

    Raises:
        N/A
    """

    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_destination(request):

    """
    Creates a new destination with the provided data, including any extra
    images. Only accessible by admin users.

    Args:
        request: The request object containing destination data.

    Returns:
        A response object with the created destination's data if successful, else
        returns an error response with status 400.

    Raises:
        N/A
    """

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

    """
    Updates the destination with the provided primary key with the data
    provided in the request. Also adds any extra images provided. Only
    accessible by admin users.

    Args:
        request: The request object containing the destination data to update.
        pk: The primary key of the destination to update.

    Returns:
        A response object with the updated destination's data if successful, else
        returns an error response with status 400.

    Raises:
        N/A
    """

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

    """
    Returns a list of all destinations.

    Returns:
    Response -- A response that contains the list of all destinations.
    """

    if request.method == 'GET':
        destinations = Destination.objects.all().order_by('-id')
        destinations = DestinationGetSerializer(destinations,many=True)

        return Response(destinations.data, status = status.HTTP_200_OK)
    
@api_view(['GET'])
def get_top5MegaCity(request):

    """
    Returns a list of top 5 mega cities.

    Returns:
    Response -- A response that contains the list of top 5 mega cities.
    """

    if request.method == 'GET':
        destinations = Destination.objects.filter(type = 'Mega City').order_by('id')[:5]
        destinations = DestinationGetSerializer(destinations,many=True)

        return Response(destinations.data, status = status.HTTP_200_OK)

@api_view(['GET'])
def get_top5NatureFriendly(request):

    """
    Returns a list of top 5 nature-friendly destinations.

    Returns:
    Response -- A response that contains the list of top 5 nature-friendly destinations.
    """
    if request.method == 'GET':
        destinations = Destination.objects.filter(type = 'Nature Friendly').order_by('id')[:5]
        destinations = DestinationGetSerializer(destinations,many=True)

        return Response(destinations.data, status = status.HTTP_200_OK)
    
@api_view(['GET'])
def view_destination(request, pk):

    """
    Returns the details of a specific destination.

    Parameters:
    pk (int): The ID of the destination to be retrieved.

    Returns:
    Response -- A response that contains the details of the requested destination.
    """

    try:
        destination = Destination.objects.get(pk=pk)
    except Destination.DoesNotExist:
        return Response(status=404)

    serializer = DestinationGetSerializer(destination)
    return Response(serializer.data, status = status.HTTP_200_OK)
    
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_guide(request):

    """
    Create a guide user for the given destination. Expects the following fields in the request data:
    - username
    - email
    - password
    - first_name
    - last_name
    - phone
    - destination (destination id)

    Requires admin user permissions.

    Returns HTTP 201 CREATED if successful with the user data in the response body. Returns HTTP 400 BAD REQUEST if the
    request data is invalid.
    """

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

    """
    Get a list of all non-guide users, sorted by most recent first. Requires admin user permissions.

    Returns HTTP 200 OK with the list of users in the response body.
    """

    if request.method == 'GET':
        users = User.objects.filter(is_superuser=False, is_guide = False).order_by('-id')
        users = CustomUserSerializer(users, many=True)
        return Response(users.data, status = status.HTTP_200_OK)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def block_user(request, user_id):

    """
    Toggle the active status of a user (i.e. block or unblock them) given their user ID. Requires admin user permissions.

    Returns HTTP 200 OK with a success message in the response body.
    """

    if request.method == 'GET':
        user = User.objects.get(id = user_id)
        user.is_active = not user.is_active
        user.save()
        return Response({"message": "success"}, status = status.HTTP_200_OK)
       
@api_view(['GET'])
def get_guides(request):

    """
    Retrieve a list of all guides.

    Returns:
        Response: A response object containing a list of serialized guide objects.
    """

    if request.method == 'GET':
        guides = User.objects.filter(is_guide = True).order_by('-id')
        guides = CustomUserSerializer(guides, many=True)
        return Response(guides.data, status = status.HTTP_200_OK)
    
@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def delete_destination(request, destination_id):

    """
    Delete a destination.

    Args:
        request: The HTTP request object.
        destination_id (int): The ID of the destination to delete.

    Returns:
        Response: A response object indicating whether the delete operation was successful.
    """

    if request.method == 'DELETE':
        destination = Destination.objects.get(id = destination_id)
        destination.delete()
        return Response({"message": "success"}, status = status.HTTP_200_OK)
    

@api_view(['GET'])
def get_guide(request, pk):

    """
    Retrieve a guide by ID.

    Args:
        request: The HTTP request object.
        pk (int): The ID of the guide to retrieve.

    Returns:
        Response: A response object containing a serialized guide object.
    """

    try:
        guide = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return Response(status=404)

    guide = CustomUserSerializer(guide)
    return Response(guide.data, status = status.HTTP_200_OK)

@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsGuide])
def update_guide(request, pk):

    """
    Update a guide's information.

    Args:
        request: The HTTP request object.
        pk (int): The ID of the guide to update.

    Returns:
        Response: A response object indicating whether the update operation was successful.
    """

    try:
        guide = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
   
    serializer = CustomUserSerializer(guide, data=request.data, partial=True)
    if serializer.is_valid():
        guide = serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def guide_booking_dates(request, pk):

    """
    Retrieve a list of booking dates for a guide.

    Args:
        request: The HTTP request object.
        pk (int): The ID of the guide to retrieve booking dates for.

    Returns:
        Response: A response object containing a list of booking dates in string format.
    """

    guide = CustomUser.objects.get(id=pk)
    bookings = Booking.objects.filter(guide=guide, is_booked=True, is_declined = False, trip_ended=False)
    booking_dates = [datetime.strftime(booking.date, "%Y-%m-%d") for booking in bookings]
    return Response(booking_dates, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def draft_booking(request):

    """
    Create a new draft booking or update an existing one for a user.
    If the user already has a draft booking, update the guide, destination, and date fields.
    If the request data is invalid, return a 400 Bad Request response.
    Otherwise, return a 200 OK response with the serialized booking data.
    """

    user_id = request.data.get('user')
    guide_id = request.data.get('guide')
    destination_id = request.data.get('destination')
    date = request.data.get('date')
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

    """
    Retrieve the draft booking for a user with the given pk.
    If the user has no draft booking, return a 400 Bad Request response.
    Otherwise, return a 200 OK response with the serialized booking data.
    """

    try:
        user = CustomUser.objects.get(id = pk)
        booking = Booking.objects.get(user=user, is_booked=False)
        serializer = BookingGetSerializer(booking)
        return Response(serializer.data, status = status.HTTP_200_OK)
    except:
        return Response('no draft booking', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['POST'])
def razorpay_start_payment(request):

    """
    This function is used to initiate the Razorpay payment process for a booking. 
    It creates a Razorpay order with the given amount and currency, and sets the 
    payment_capture to 1, which means that the payment will be automatically 
    captured once it is successful. 

    Parameters:
    - request: A POST request containing the following data in request.data:
        - amount (float): The amount to be paid in INR.
        - booking_id (int): The ID of the booking for which the payment is being made.

    Returns:
    - Response: A JSON response containing the following data:
        - payment (dict): The Razorpay payment object that was created.
        - booking (dict): The serialized data of the Booking object for which the payment was made.
    """

    # request.data is coming from frontend
    amount = request.data['amount']
    booking_id = request.data['booking_id']

    # setup razorpay client this is the client to whome user is paying money that's you
    client = razorpay.Client(auth=(settings.RAZORPAY_ID, settings.RAZORPAY_ACCOUNT_ID))

    # create razorpay order
    # the amount will come in 'paise' that means if we pass 50 amount will become
    # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
    # mumtiply it by 100 so it will be 50 rupees.
    payment = client.order.create({"amount": int(float(amount) * 100), 
                                   "currency": "INR", 
                                   "payment_capture": "1"})

    # we are saving an order with isPaid=False because we've just initialized the order
    # we haven't received the money we will handle the payment succes in next 
    # function
    booking = Booking.objects.get(id=booking_id)
    booking.payment_id = payment['id']
    booking.save()
    serializer = BookingSerializer(booking)


    data = {
        "payment": payment,
        "booking": serializer.data
    }
    return Response(data)


@api_view(['POST'])
def razorpay_payment_success(request):

    """
    This function is called by the Razorpay server after the payment is successful. 
    It verifies the payment using the Razorpay client, and if the payment is valid, 
    it updates the Booking object to set is_booked to True and generates a 6-digit 
    start code for the booking. It also creates a Payment object for the booking. 

    Parameters:
    - request: A POST request containing the following data in request.data:
        - response (string): The response received from Razorpay server after the payment is successful.

    Returns:
    - Response: A JSON response containing the following data:
        - message (string): A success message indicating that the payment was successfully received.
    """

    # request.data is coming from frontend
    res = json.loads(request.data["response"])

    ord_id = ""
    raz_pay_id = ""
    raz_signature = ""

    # res.keys() will give us list of keys in res
    for key in res.keys():
        if key == 'razorpay_order_id':
            ord_id = res[key]
        elif key == 'razorpay_payment_id':
            raz_pay_id = res[key]
        elif key == 'razorpay_signature':
            raz_signature = res[key]

    # get order by payment_id which we've created earlier with isPaid=False
    booking = Booking.objects.get(payment_id=ord_id)

    # we will pass this whole data in razorpay client to verify the payment
    data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
    }

    
    client = razorpay.Client(auth=(settings.RAZORPAY_ID, settings.RAZORPAY_ACCOUNT_ID))

    # checking if the transaction is valid or not by passing above data dictionary in 
    # razorpay client if it is "valid" then check will return None
    check = client.utility.verify_payment_signature(data)

    booking.is_booked = True
    booking.is_start_code = random.randint(100000, 999999)
    booking.save()
    payment = Payment.objects.create(booking=booking, method='Razorpay')

    if check is not None:
        print("Redirect to error url or error page")
        return Response({'error': 'Something went wrong'})

    res_data = {
        'message': 'payment successfully received!'
    }

    return Response(res_data)


    
@api_view(['PUT'])
def payment_confirmed(request, pk):

    """
    Confirms a payment for a booking identified by `pk` and updates its
    `is_booked` and `is_start_code` fields. Also creates a payment object for
    the booking with a payment method of 'PayPal'. Returns the serialized payment
    object and a status code of 200 OK.

    Args:
        request: The HTTP request object.
        pk (int): The primary key of the booking to confirm the payment for.

    Returns:
        A Response object containing the serialized payment data and an HTTP
        status code of 200 OK.
    """

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

    """
    Retrieve all bookings made by a user.

    Args:
        request: The HTTP request sent to the server.
        pk: The ID of the user whose bookings are to be retrieved.

    Returns:
        If the user has made any bookings, a JSON response containing the serialized
        Booking objects will be returned with a HTTP status code of 200 (OK).
        If the user has not made any bookings, a string response with a HTTP status
        code of 400 (BAD REQUEST) will be returned.

    Raises:
        Http404: If the user with the specified pk does not exist.
    """

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

    """
    Retrieve all cancelled bookings made by a user.

    Args:
        request: The HTTP request sent to the server.
        pk: The ID of the user whose cancelled bookings are to be retrieved.

    Returns:
        If the user has made any cancelled bookings, a JSON response containing the
        serialized Booking objects will be returned with a HTTP status code of 200 (OK).
        If the user has not made any cancelled bookings, a string response with a HTTP
        status code of 400 (BAD REQUEST) will be returned.

    Raises:
        Http404: If the user with the specified pk does not exist.
    """

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

    """
    Retrieve all completed bookings made by a user.

    Args:
        request: The HTTP request sent to the server.
        pk: The ID of the user whose completed bookings are to be retrieved.

    Returns:
        If the user has made any completed bookings, a JSON response containing the
        serialized Booking objects will be returned with a HTTP status code of 200 (OK).
        If the user has not made any completed bookings, a string response with a HTTP
        status code of 400 (BAD REQUEST) will be returned.

    Raises:
        Http404: If the user with the specified pk does not exist.
    """

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

    """
    Cancel a booking made by a user.

    Args:
        request: The HTTP request sent to the server.
        pk: The ID of the booking to be cancelled.

    Returns:
        A string response indicating that the booking has been cancelled with a
        HTTP status code of 200 (OK).

    Raises:
        Http404: If the booking with the specified pk does not exist.
    """

    booking = Booking.objects.get(id = pk)
    booking.is_declined = True
    booking.save()
    return Response("Trip Cancelled", status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_guide_upcomming_bookings(request, pk):

    """
    Retrieve all upcoming bookings for a guide.

    Args:
        request: The HTTP request sent to the server.
        pk: The ID of the guide whose upcoming bookings are to be retrieved.

    Returns:
        If the guide has any upcoming bookings, a JSON response containing the
        serialized Booking objects will be returned with a HTTP status code of 200 (OK).
        If the guide has no upcoming bookings, a string response with a HTTP status
        code of 400 (BAD REQUEST) will be returned.

    Raises:
        Http404: If the guide with the specified pk does not exist.
    """

    guide = CustomUser.objects.get(id = pk)
    bookings = Booking.objects.filter(guide = guide, is_declined=False, is_booked = True, trip_started = False).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_guide_completed_bookings(request, pk):

    """
    Retrieve all completed bookings for a guide that have been confirmed.

    Args:
        request: The request object containing metadata about the request.
        pk (int): The id of the guide for which to retrieve completed bookings.

    Returns:
        Response: A response object containing a list of serialized Booking objects.
            Returns a status of HTTP_200_OK if bookings were found, else a status of HTTP_400_BAD_REQUEST.
    """

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

    """
    Retrieves all current bookings associated with the guide identified by pk.
    A booking is considered current if it has started but not yet ended. Returns a 
    Response object containing serialized Booking objects with HTTP status 200 if bookings are found, 
    or 'no bookings' with status 400 if no bookings are found.

    Parameters:

    request: The HTTP request object.
    pk (int): The ID of the guide to retrieve bookings for.

    Returns:

    A Response object containing serialized Booking objects and HTTP status 200 if bookings are found, 
    or 'no bookings' with HTTP status 400 if no bookings are found.
    """
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

    """
    Starts a trip associated with the booking identified by pk and updates 
    the corresponding booking object's trip_started and is_end_code fields. 
    Returns a Response object with HTTP status 200 if the trip is successfully started, 
    or 'Incorrect Code' with HTTP status 400 if the code provided in the request body does 
    not match the booking's is_start_code field.

    Parameters:

    request: The HTTP request object.
    pk (int): The ID of the booking to start the trip for.

    Returns:

    A Response object with HTTP status 200 if the trip is successfully started, 
    or 'Incorrect Code' with HTTP status 400 if the code provided in the request body 
    does not match the booking's is_start_code field.
    """

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

    """
    Ends a trip associated with the booking identified by pk and updates the 
    corresponding booking object's trip_ended field. Also creates a GuidePayment 
    object associated with the booking. Returns a Response object containing 
    serialized GuidePayment object with HTTP status 200 if the trip is successfully ended, 
    or 'incorrect code' with HTTP status 400 if the code provided in the request body 
    does not match the booking's is_end_code field.

    Parameters:

    request: The HTTP request object.
    pk (int): The ID of the booking to end the trip for.

    Returns:

    A Response object containing serialized GuidePayment object and HTTP status 200 
    if the trip is successfully ended, or 'incorrect code' with HTTP status 400 
    if the code provided in the request body does not match the booking's is_end_code field.
    """

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

    """
    Retrieve all scheduled bookings that have not yet started.

    Returns:
    - Response object with serialized data of all scheduled bookings and HTTP status code 200 on success.
    - Response object with error message 'no bookings' and HTTP status code 400 if no bookings are found.
    """

    bookings = Booking.objects.filter(is_booked = True, is_declined=False, trip_started = False).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_active_bookings(request):

    """
    Retrieve all active bookings that have started but not yet ended.

    Returns:
    - Response object with serialized data of all active bookings and HTTP status code 200 on success.
    - Response object with error message 'no bookings' and HTTP status code 400 if no bookings are found.
    """

    bookings = Booking.objects.filter(is_booked = True, trip_started = True, trip_ended = False).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_completed_bookings(request):

    """
    Retrieve all completed bookings that have ended.

    Returns:
    - Response object with serialized data of all completed bookings and HTTP status code 200 on success.
    - Response object with error message 'no bookings' and HTTP status code 400 if no bookings are found.
    """

    bookings = Booking.objects.filter(is_booked = True, trip_ended = True).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def all_canceled_bookings(request):

    """
    Retrieve all canceled bookings.

    Returns:
    - Response object with serialized data of all canceled bookings and HTTP status code 200 on success.
    - Response object with error message 'no bookings' and HTTP status code 400 if no bookings are found.
    """

    bookings = Booking.objects.filter(is_booked = True, is_declined=True).order_by('date')
    if bookings:
        serializer = BookingGetSerializer(bookings, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no bookings', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def received_payments(request):

    """
    Retrieve all received payments that have not been refunded and whose booking has not been declined.
    Returns a list of Payment objects in serialized form.
    """

    payments = Payment.objects.filter(is_refunded=False, booking__is_declined=False).order_by('-id')
    if payments:
        serializer = PaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def refunded_payments(request):

    """
    Retrieve all refunded payments.
    Returns a list of Payment objects in serialized form.
    """

    payments = Payment.objects.filter(is_refunded=True).order_by('-id')
    if payments:
        serializer = PaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def pending_refunds(request):

    """
    Retrieve all payments that have not been refunded and whose booking has been declined.
    Returns a list of Payment objects in serialized form.
    """

    payments = Payment.objects.filter(is_refunded=False, booking__is_declined=True).order_by('-id')
    if payments:
        serializer = PaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def paid_payments(request):

    """
    Retrieve all GuidePayments that have been paid.
    Returns a list of GuidePayment objects in serialized form.
    """

    payments = GuidePayment.objects.filter(is_paid=True).order_by('-id')
    if payments:
        serializer = GuidePaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
@permission_classes([IsAdminUser])
def pending_payments(request):

    """
    Returns a list of all the pending guide payments that have not been paid yet. 
    If no payments are pending, returns a message indicating that there are no payments.
    """

    payments = GuidePayment.objects.filter(is_paid=False).order_by('-id')
    if payments:
        serializer = GuidePaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@permission_classes([IsAdminUser])
def pay_refund(request, pk):

    """
    Refunds the payment with the given id and updates the user's wallet balance by adding the 
    amount of the refunded payment. Returns a message indicating that the payment has been refunded.
    """

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

    """
    Marks the guide payment with the given id as paid and updates the guide's wallet balance by 
    adding the amount of the paid payment. Returns a message indicating that the payment has been paid.
    """

    payment = GuidePayment.objects.get(id = pk)
    guide = payment.booking.guide
    amount = payment.amount
    guide.wallet = guide.wallet + amount
    guide.save()
    payment.is_paid = True
    payment.save()
    return Response("paid", status = status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsGuide])
def guide_pending_payments(request, pk):

    """
    Returns a list of all the pending guide payments for the guide with the given id that have not 
    been paid yet. If no payments are pending, returns a message indicating that there are no payments.
    """

    guide = CustomUser.objects.get(id = pk)
    payments = GuidePayment.objects.filter(booking__guide=guide, is_paid=False).order_by('-id')
    if payments:
        serializer = GuidePaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated, IsGuide])
def guide_paid_payments(request, pk):

    """
    Returns a list of all the guide payments for the guide with the given id that have been paid. 
    If no payments have been paid, returns a message indicating that there are no payments.
    """

    guide = CustomUser.objects.get(id = pk)
    payments = GuidePayment.objects.filter(booking__guide=guide, is_paid=True).order_by('-id')
    if payments:
        serializer = GuidePaymentGetSerializer(payments, many=True)
        return Response(serializer.data, status = status.HTTP_200_OK)
    else:
        return Response('no payments', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_chat_list(request, pk):
    user = CustomUser.objects.get(id = pk)
    chats = Chat.objects.filter(user = user).annotate(latest_message_time=Max('messages__created_at')).order_by('-latest_message_time')
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_chat_guide(request, pk):
    chat = Chat.objects.get(id = pk)
    serializer = ChatSerializer(chat)
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def guide_chat_list(request, pk):
    guide = CustomUser.objects.get(id = pk)
    chats = Chat.objects.filter(guide = guide).annotate(latest_message_time=Max('messages__created_at')).order_by('-latest_message_time')
    serializer = ChatSerializer(chats, many=True)
    return Response(serializer.data, status = status.HTTP_200_OK)

@api_view(['POST'])
def create_or_start_chat(request):
    userId = request.data.get('userId')
    guideId = request.data.get('guideId')
    
    user = CustomUser.objects.get(id = userId)
    guide = CustomUser.objects.get(id = guideId)
    chat = Chat.objects.get_or_create(user = user, guide = guide)
    chat = Chat.objects.get(user = user, guide = guide)
    serializer = ChatSerializer(chat)
    return Response(serializer.data, status = status.HTTP_200_OK)






    







        



