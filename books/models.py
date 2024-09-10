from django.db import models
from customers.models import Customer
from django.conf import settings

# Create your models here.
class Book(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    published_date = models.DateField()
    isbn_number = models.CharField(max_length=13, unique=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    stock = models.PositiveIntegerField()
    description = models.TextField(blank=True)
    
    average_rating = models.FloatField(default=0.0)

    def __str__(self):
        return self.title
    
    def update_average_rating(self):
        """
        Recalculates and updates the average rating of the book.
        """
        reviews = self.reviews.all()  # Related name for review set
        total_rating = sum(review.rating for review in reviews)
        self.average_rating = total_rating / reviews.count() if reviews.exists() else 0
        self.save()

class Review(models.Model):
    book = models.ForeignKey(Book, related_name='reviews', on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reviews', on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(choices=[(i, i) for i in range(1, 6)])  # Rating from 1 to 5
    comment = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['book', 'user']  # Ensure one review per user per book

    def __str__(self):
        return f'{self.user} - {self.book} - {self.rating} stars'

    def save(self, *args, **kwargs):
        """
        Overriding the save method to update the book's average rating after a new review is created or updated.
        """
        super().save(*args, **kwargs)
        self.book.update_average_rating()
    
    

class Wishlist(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='wishlist', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='wishlisted_by', on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'book']  # Ensure a book is wishlisted only once per user

    def __str__(self):
        return f'{self.user.username} - {self.book.title}'

class Favorite(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='favorites', on_delete=models.CASCADE)
    book = models.ForeignKey(Book, related_name='favorited_by', on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['user', 'book']  # Ensure a book is favorited only once per user

    def __str__(self):
        return f'{self.user.username} - {self.book.title}'

