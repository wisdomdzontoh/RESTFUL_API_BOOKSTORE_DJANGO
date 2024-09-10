from rest_framework import serializers
from .models import Book, Review, Wishlist, Favorite

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # Show username instead of user ID

    class Meta:
        model = Review
        fields = ['id', 'book', 'user', 'rating', 'comment', 'created_at', 'updated_at']
        read_only_fields = ['user', 'created_at', 'updated_at']

class BookSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)  # Nested serializer for reviews
    average_rating = serializers.ReadOnlyField()  # Read-only field for average rating

    class Meta:
        model = Book
        fields = '__all__'


class WishlistSerializer(serializers.ModelSerializer):
    book_title = serializers.ReadOnlyField(source='book.title')

    class Meta:
        model = Wishlist
        fields = ['id', 'user', 'book', 'book_title', 'added_at']
        read_only_fields = ['user', 'added_at']

class FavoriteSerializer(serializers.ModelSerializer):
    book_title = serializers.ReadOnlyField(source='book.title')

    class Meta:
        model = Favorite
        fields = ['id', 'user', 'book', 'book_title', 'added_at']
        read_only_fields = ['user', 'added_at']