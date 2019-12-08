# from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from books.models import Book, Has, User
from rest_framework import permissions, status

from books.serializers import BookSerializer, HasSerializer, UserSerializer, UserSerializerWithToken

@api_view(['GET'])
def current_user(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class BookListCreate(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = (permissions.AllowAny,)

class HasListCreate(generics.ListCreateAPIView):
    queryset = Has.objects.all()
    serializer_class = HasSerializer

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET'])
def profile(request):
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
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
