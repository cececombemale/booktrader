# from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from books.models import Book, Has, User
from books.serializers import BookSerializer, HasSerializer, UserSerializer

class BookListCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class HasListCreate(generics.ListCreateAPIView):
    queryset = Has.objects.all()
    serializer_class = HasSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Custom user registration view from https://stackoverflow.com/questions/16857450/how-to-register-users-in-django-rest-framework#29391122
# @api_view(['POST'])
# def create_auth(request):
#     serialized = UserSerializer(data=request.DATA)
#     if serialized.is_valid():
#         User.objects.create_user(
#             serialized.data['email'],
#             serialized.data['username'],
#             serialized.data['password'],
#         )
#         return Response(serialized.data, status=status.HTTP_201_CREATED)
