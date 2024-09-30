import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReviewList = () => {
  const { book_id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get(`/books/${book_id}/reviews/`);
        setReviews(response.data);
      } catch (error) {
        toast.error('Failed to load reviews');
      }
    };

    fetchReviews();
  }, [book_id]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id} className="mb-2 p-2 border-b border-gray-200">
            {review.content} - {review.rating} stars
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
