from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser
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
        



