from django.urls import path
from django.conf.urls import url
from . import views

urlpatterns = [
    path('api/book/', views.BookListCreate.as_view()),
    path('api/has/', views.HasListCreate.as_view()),
    path('api/user/list/', views.UserList.as_view()),
    path('api/user/register', views.UserCreate.as_view()),
    path('api/search', views.search_index, name='search_view')

]