# from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from books.models import Book, Has, User, ListingForm, BookForm
from books.serializers import BookSerializer, HasSerializer, UserSerializer
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.decorators import login_required
import datetime

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

def home(request):
    '''List of my current listings'''
    if request.method == 'GET':
        try:
            listings = Has.objects.filter(user=request.user)
        except TypeError:
            listings = Has.objects.all()
    return HttpResponse(listings, content_type='application/json')

@login_required
def listing(request):
    if request.method == 'POST':
        form = ListingForm(request.POST)
        new_listing = form.save(commit=False)
        new_listing.isbn = request.isbn
        new_listing.user = request.user
        new_listing.added_at = datetime.datetime.now()
        new_listing.save()
        return home(request)
    else:
        form = ListingForm()
    return HttpResponse(form)

def addBook(request):
    if request.method == 'POST':
        form = BookForm(request.POST)
        new_book = form.save(commit=False)
        new_book.isbn = request.isbn
        new_book.title = request.title
        new_book.author = request.author
        new_book.edition = request.edition
        return home(request)
    else:
        form = BookForm()
    return HttpResponse(form)

def registerUser(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        new_user = form.save(commit=True)
        user = authenticate(username=new_user.username,
                            password=form.clean_password2())
        if user is not None:
            login(request, user)
        else:
            raise Exception
        return home(request)
    else:
        form = UserCreationForm()
    return HttpResponse(form)

def login(request):
    if request.method == 'POST':
        form = User

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
