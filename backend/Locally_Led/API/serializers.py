from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password


class ExtraDestinationImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExtraDestinationImage
        fields = ['destination', 'image']

class GuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name' ,'last_name', 'image', 'wallet']

class DestinationGetSerializer(serializers.ModelSerializer):
    extra_images = ExtraDestinationImageSerializer(source='extradestinationimage_set', many=True, read_only=True)
    guides = GuideSerializer(source='customuser_set', many=True, read_only=True)
    guide_count = serializers.SerializerMethodField()

    class Meta:
        model = Destination
        fields = ['id','name', 'country', 'image','video','fee', 'about','type','short_info', 'guide_count', 'extra_images','guides']

    def get_guide_count(self, obj):
        return obj.customuser_set.count()


class CustomUserSerializer(serializers.ModelSerializer):
    destination = DestinationGetSerializer(required = False,read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id','first_name','last_name', 'username', 'email', 'password', 'phone','image','is_active','bio','destination', 'wallet']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        if password is not None:
            validated_data['password'] = make_password(password)
        return super().create(validated_data)
    
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.phone = validated_data.get('phone', instance.phone)

        image = validated_data.get('image', None)
        if image is not None:
            instance.image = image
        
        instance.save()

        return instance

        
class DestinationSerializer(serializers.ModelSerializer):
    extra_images = ExtraDestinationImageSerializer(many=True, required=False)

    class Meta:
        model = Destination
        fields = ['name', 'country', 'about', 'image','fee','video', 'short_info', 'type', 'extra_images']

    def create(self, validated_data):
        extra_images_data = validated_data.pop('extra_images', [])

        destination = Destination.objects.create(**validated_data)

        for extra_image_data in extra_images_data:
            ExtraDestinationImage.objects.create(destination=destination, **extra_image_data)

        return destination
    
    def update(self, instance, validated_data):
        extra_images_data = validated_data.pop('extra_images', [])

        instance.name = validated_data.get('name', instance.name)
        instance.country = validated_data.get('country', instance.country)
        instance.about = validated_data.get('about', instance.about)
        instance.type = validated_data.get('type', instance.type)
        instance.short_info = validated_data.get('short_info', instance.short_info)
        instance.fee = validated_data.get('fee', instance.fee)

        image = validated_data.get('image', None)
        video = validated_data.get('video', None)

        if image is not None:
            instance.image = image

        if video is not None:
            instance.video = video

        instance.save()

        for extra_image_data in extra_images_data:
            ExtraDestinationImage.objects.create(destination=instance, **extra_image_data)

        return instance
    

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Booking
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'

class BookingGetSerializer(serializers.ModelSerializer):
    destination = DestinationGetSerializer(read_only=True)
    user = CustomUserSerializer(read_only=True)
    guide = GuideSerializer(read_only=True)
    payment = PaymentSerializer(read_only=True)


    class Meta:
        model = Booking
        fields = '__all__'

class PaymentGetSerializer(serializers.ModelSerializer):
    booking = BookingGetSerializer(read_only=True)

    class Meta:
        model = Payment
        fields = '__all__'

class GuidePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuidePayment
        fields = '__all__'

class GuidePaymentGetSerializer(serializers.ModelSerializer):
    booking = BookingGetSerializer(read_only=True)

    class Meta:
        model = GuidePayment
        fields = '__all__'

