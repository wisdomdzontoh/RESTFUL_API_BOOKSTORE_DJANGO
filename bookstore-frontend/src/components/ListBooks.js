import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const ListBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get('/books/');
        console.log(response.data.results);  // Inspect the correct array in the response
        setBooks(response.data.results);  // Set books to the results array
        setLoading(false);
        toast.success('Books loaded successfully!');
      } catch (error) {
        setLoading(false);
        toast.error('Failed to load books');
      }
    };

    fetchBooks();  // Call the function to fetch books
  }, []);  // Empty dependency array to run only once on mount

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Books List</h1>
      {loading ? (
        <div className="text-center">Loading books...</div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {books.length > 0 ? (
            books.map((book) => (
              <li key={book.id} className="p-4 border rounded-md shadow-md bg-white">
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-sm text-gray-500">by {book.author}</p>
                <p className="text-sm text-gray-500">Published: {book.published_date}</p>
                <p className="text-sm text-gray-500">ISBN: {book.isbn_number}</p>
                <p className="text-sm text-gray-500">Price: {book.price}</p>
                <p className="text-sm text-gray-500">Stock: {book.stock}</p>
                <p className="text-sm text-gray-500">Rating: {book.average_rating}</p>
                <p className="text-sm text-gray-700 mt-2">{book.description}</p>
              </li>
            ))
          ) : (
            <p>No books available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ListBooks;
