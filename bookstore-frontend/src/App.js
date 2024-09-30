import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import api from './services/api';
// Import your pages
import ListBookPage from './pages/ListBookPage';
import CreateBookPage from './pages/CreateBookPage';
import BookDetailPage from './pages/BookDetailPage';
import WishListPage from './pages/WishListPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white">
        <ul className="flex space-x-4">
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/books/create">Create Book</Link></li>
        </ul>
      </nav>

      <div className="container mx-auto p-4">
        <Routes>
          {/* Route for book list */}
          <Route path="/books" element={<ListBookPage />} />
          
          {/* Route for creating a new book */}
          <Route path="/books/create" element={<CreateBookPage />} />
          
          {/* Route for book detail */}
          <Route path="/books/:pk" element={<BookDetailPage />} />
          
          {/* Route for wishlist */}
          <Route path="/wishlist" element={<WishListPage />} />
          
          {/* Route for favorites */}
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
