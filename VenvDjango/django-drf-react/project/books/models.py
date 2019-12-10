from django.db import models
from django.contrib.auth.models import User
from django.forms import ModelForm
from django.contrib.auth.forms import UserCreationForm

# Create your models here.
class Book(models.Model):
    isbn = models.CharField(primary_key=True,max_length=13) # primary key
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=40)
    edition = models.IntegerField(default=1)

class Has(models.Model):
    isbn = models.ForeignKey(Book, on_delete=models.PROTECT) # Ensure an owned book is never deleted
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    VERY_POOR = "VP"
    POOR = "P"
    OKAY = "O"
    GOOD = "G"
    LIKE_NEW = "LN"
    CONDITION_CHOICES = [
        (VERY_POOR, "Very Poor"),
        (POOR, "Poor"),
        (OKAY, "Okay"),
        (GOOD, "Good"),
        (LIKE_NEW, "Like New"),
    ]
    condition = models.CharField(max_length=2, choices=CONDITION_CHOICES, default=GOOD)
    added_at = models.DateTimeField(auto_now_add=True)

# class ListingForm(ModelForm):
#     class Meta:
#         model = Has
#         fields = ("isbn", "condition",)

# class BookForm(ModelForm):
#     class Meta:
#         model = Book
#         fields = ("isbn", "title", "author", "edition",)

# class MyUserCreationForm(UserCreationForm):
#   class Meta(UserCreationForm.Meta):
#     help_texts = {
#       'username' : '',
#     }