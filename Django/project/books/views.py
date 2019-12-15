# from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from books.models import Book, Listing, User
from rest_framework import permissions, status
from django.http import HttpResponse
from books.serializers import BookSerializer, ListingSerializer, UserSerializer, UserSerializerWithToken
from django.views.decorators.csrf import csrf_exempt
import json
from django.core import serializers

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

class ListingListCreate(generics.ListCreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    permission_classes = (permissions.AllowAny,)

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
    print(request.user)
    """
    Determine the current user by their token, and return their data
    """
    
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# -- Accessed in profile --
@csrf_exempt # TODO: add CSRF token somewhere in frontend? On login/register?
def addBook(request):
    if request.method == 'POST':
        new_book = Book()
        new_book.isbn = request.POST['isbn']
        new_book.title = request.POST['title']
        new_book.author = request.POST['author']
        new_book.edition = request.POST['edition']
        new_book.save()
        return HttpResponse("Success")
    else:
        return HttpResponse("please use POST request")

@api_view(['POST','GET'])
def userListing(request):
    print(request.user)
    if request.method == 'POST':
        new_listing = Listing()
        new_listing.user = request.user
        try:
            book = Book.objects.get(pk=request.POST['isbn'])
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        new_listing.isbn = book
        new_listing.condition = request.POST['condition']
        new_listing.price = request.POST['price']
        new_listing.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        
        try:
            listings = list(Listing.objects.filter(user=request.user).prefetch_related('isbn'))
            books = []
            for listing in listings:
                books.append(listing.isbn)
            listings += books
        except TypeError:
            listings = None
        print(serializers.serialize("json", listings))
        return HttpResponse(serializers.serialize("json",listings))

@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def listingsFromISBN(request):
    try:
        listings = list(Listing.objects.filter(isbn=request.POST['isbn']))
    except TypeError:
        listings = None
    return HttpResponse(serializers.serialize("json", listings))
