from django.contrib import admin
from .models import Book, Review, Wishlist, Favorite

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'price', 'average_rating']

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ['book', 'user', 'rating', 'created_at']
    search_fields = ['book__title', 'user__username']
    


@admin.register(Wishlist)
class WishlistAdmin(admin.ModelAdmin):
    list_display = ['user', 'book', 'added_at']
    search_fields = ['user__username', 'book__title']

@admin.register(Favorite)
class FavoriteAdmin(admin.ModelAdmin):
    list_display = ['user', 'book', 'added_at']
    search_fields = ['user__username', 'book__title']



