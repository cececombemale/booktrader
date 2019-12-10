# from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from books.models import Book, Has, User
from books.serializers import BookSerializer, HasSerializer, UserSerializer
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import datetime
import json

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

# @api_view(('GET', 'POST'))
def home(request):
    '''List of my current listings'''
    name = "Stranger"
    if request.user.is_authenticated:
        name = request.user.first_name # might need to query DB for first name with username?
    try:
        listings = Has.objects.filter(user=request.user)
    except TypeError:
        listings = Has.objects.all()[0:10]
    serializer = HasSerializer(listings, many=True)
    context = {
        'listings': json.dumps(serializer.data),
        'first_name': name
    }
    return HttpResponse(json.dumps(context))

@login_required
def listing(request):
    if request.method == 'POST':
        # form = ListingForm(request.POST)
        new_listing = Has(isbn=request.POST['isbn'])
        new_listing.condition = request.POST['condition']
        new_listing.user = request.user # hope this works
        new_listing.save()
        return home(request)
    else:
        form = ListingForm()
    return HttpResponse(form)

def addBook(request):
    if request.method == 'POST':
        # form = BookForm(request.POST)
        new_book = Book()
        new_book.isbn = request.POST['isbn']
        new_book.title = request.POST['title']
        new_book.author = request.POST['author']
        new_book.edition = request.POST['edition']
        new_book.save()
        return home(request)
    else:
        form = BookForm()
    return HttpResponse(form)

@csrf_exempt # should probably include the csrf token somewhere in the HTML block
def registerUser(request):
    if request.method == 'POST':
        # form = MyUserCreationForm(request.POST)
        new_user = User.objects.create_user(request.POST['username'])
        new_user.set_password(request.POST['password1'])
        new_user.first_name = request.POST['first_name']
        new_user.first_name = request.POST['last_name']
        new_user.email = request.POST['email']
        new_user.save()
        user = authenticate(username=new_user.username, password=request.POST['password1'])
        if user is not None:
            login(request, user)
        else:
            raise Exception
        return home(request)
    else:
        form = UserCreationForm()
    return HttpResponse(form)

def loginUser(request):
    if request.method == 'POST':
        user = authenticate(username=request.POST['username'], password=request.POST['password'])
    if user is not None:
        login(request, user)
    else:
        raise Exception
    return home(request)
# def login(request):
#     if request.method == 'POST':
#         form = User

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
