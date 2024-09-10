from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import Book, Review, Wishlist, Favorite
from .serializers import BookSerializer, ReviewSerializer, WishlistSerializer, FavoriteSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework import filters
from rest_framework.response import Response


# View for listing all books or creating a new one

class BookListCreateView(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title']
    ordering_fields = ['published_date', 'price']


# View for retrieving, updating, or deleting a single book
class BookDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    

class ReviewCreateView(generics.CreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        book_id = self.kwargs['book_id']
        user = self.request.user

        # Check if a review by this user for this book already exists
        if Review.objects.filter(book_id=book_id, user=user).exists():
            return Response(
                {"detail": "You have already reviewed this book."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # If no review exists, save the new one
        serializer.save(user=user, book_id=book_id)

class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer

    def get_queryset(self):
        book_id = self.kwargs['book_id']
        return Review.objects.filter(book__id=book_id)
    
    

class WishlistListView(generics.ListAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Wishlist.objects.filter(user=self.request.user)

class WishlistCreateView(generics.CreateAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        book_id = self.request.data.get('book')
        book = Book.objects.get(pk=book_id)
        if Wishlist.objects.filter(user=self.request.user, book=book).exists():
            return Response(
                {"detail": "This book is already in your wishlist."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save(user=self.request.user, book=book)

class FavoriteListView(generics.ListAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Favorite.objects.filter(user=self.request.user)

class FavoriteCreateView(generics.CreateAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        book_id = self.request.data.get('book')
        book = Book.objects.get(pk=book_id)
        if Favorite.objects.filter(user=self.request.user, book=book).exists():
            return Response(
                {"detail": "This book is already in your favorites."},
                status=status.HTTP_400_BAD_REQUEST
            )
        serializer.save(user=self.request.user, book=book)

class WishlistRemoveView(generics.DestroyAPIView):
    serializer_class = WishlistSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'book_id'  # Specify the lookup field to match the URL parameter

    def get_queryset(self):
        user = self.request.user
        return Wishlist.objects.filter(user=user)

class FavoriteRemoveView(generics.DestroyAPIView):
    serializer_class = FavoriteSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'book_id'  # Specify the lookup field to match the URL parameter

    def get_queryset(self):
        user = self.request.user
        return Favorite.objects.filter(user=user)


