from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Book(models.Model):
    isbn = models.CharField(primary_key=True,max_length=13) # primary key
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=40)
    edition = models.IntegerField(default=1)

class Listing(models.Model):
    isbn = models.ForeignKey(Book, on_delete=models.PROTECT, related_name='listing') # Ensure an owned book is never deleted
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
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
    price = models.DecimalField(max_digits=8, decimal_places=2)
    added_at = models.DateTimeField(auto_now_add=True)

