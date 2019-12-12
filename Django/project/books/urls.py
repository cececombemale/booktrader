from django.urls import path
from . import views

urlpatterns = [
    path('api/book/', views.BookListCreate.as_view()),
    path('api/listing/', views.ListingListCreate.as_view()),
    path('api/user/list/', views.UserList.as_view()),
    path('api/user/register', views.UserCreate.as_view()),
    path('api/profile',views.profile),
    path('api/addbook', views.addBook),

]