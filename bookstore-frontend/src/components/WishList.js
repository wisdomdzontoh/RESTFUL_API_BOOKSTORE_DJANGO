import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get('/wishlist/');
        console.log('Wishlist data:', response.data.results);  // Check data in console
        setWishlist(response.data.results);  // Access results array
      } catch (error) {
        console.error('Error loading wishlist:', error.response || error.message); // Log error details
        toast.error('Failed to load wishlist');
      }
    };

    fetchWishlist();  // Call the function to fetch wishlist
  }, []);  // Empty dependency array to run only once on mount

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>
      {wishlist.length > 0 ? (
        <ul>
          {wishlist.map((item) => (
            <li key={item.id} className="mb-2 p-2 border-b border-gray-200">
              {item.book.title} by {item.book.author}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in wishlist</p>
      )}
    </div>
  );
};

export default Wishlist;
