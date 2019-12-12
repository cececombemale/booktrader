from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from books.models import Book, Listing, User

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('isbn', 'title', 'author', 'edition')

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ('isbn', 'user', 'condition', 'price', 'added_at')

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    password = serializers.CharField(write_only=True)
    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'first_name', 'last_name', 'email')

class UserSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = User
        fields = ('username', 'first_name','last_name','email')
        # fields = ('username', 'password', 'email', 'first_name', 'last_name')
