import React, { useState, useEffect } from 'react';
import api from '../services.api';
import { toast } from 'react-toastify';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await api.get('/favorites/');
        setFavorites(response.data);
      } catch (error) {
        toast.error('Failed to load favorites');
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Books</h2>
      <ul>
        {favorites.map((item) => (
          <li key={item.id} className="mb-2 p-2 border-b border-gray-200">
            {item.book.title} by {item.book.author}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
