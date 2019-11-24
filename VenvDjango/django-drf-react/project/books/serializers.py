from rest_framework import serializers
from books.models import Book, Has, User

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ('isbn', 'title', 'author', 'edition')

class HasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Has
        fields = ('isbn', 'user', 'condition', 'added_at')

class UserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
        )
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = User
        fields = ('username', 'password', 'email', 'first_name', 'last_name')