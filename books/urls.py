from django.urls import path
from .views import (
    WishlistListView, WishlistCreateView, WishlistRemoveView,
    FavoriteListView, FavoriteCreateView, FavoriteRemoveView,
    BookListCreateView, BookDetailView, ReviewCreateView, ReviewListView
)

urlpatterns = [
    path('books/', BookListCreateView.as_view(), name='book-list-create'),
    path('books/<int:pk>/', BookDetailView.as_view(), name='book-detail'),
    path('books/<int:book_id>/reviews/', ReviewListView.as_view(), name='review-list'),
    path('books/<int:book_id>/reviews/create/', ReviewCreateView.as_view(), name='review-create'),
    
    
     # Wishlist URLs
    path('wishlist/', WishlistListView.as_view(), name='wishlist-list'),
    path('wishlist/add/', WishlistCreateView.as_view(), name='wishlist-add'),
    path('wishlist/remove/<int:book_id>/', WishlistRemoveView.as_view(), name='wishlist-remove'),
    
    # Favorites URLs
    path('favorites/', FavoriteListView.as_view(), name='favorites-list'),
    path('favorites/add/', FavoriteCreateView.as_view(), name='favorites-add'),
    path('favorites/remove/<int:book_id>/', FavoriteRemoveView.as_view(), name='favorites-remove'),
]
