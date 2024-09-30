import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookDetail = () => {
  const { pk } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await api.get(`/books/${pk}/`);
        setBook(response.data);
      } catch (error) {
        toast.error('Failed to load book details');
      }
    };

    fetchBookDetail();
  }, [pk]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Published Date: {book.published_date}</p>
      <p>ISBN: {book.isbn_number}</p>
      <p>Price: ${book.price}</p>
      <p>{book.description}</p>
    </div>
  );
};

export default BookDetail;
