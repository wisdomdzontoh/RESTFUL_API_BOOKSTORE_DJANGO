import React, { useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateReview = () => {
  const { book_id } = useParams();
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { content, rating };

    try {
      await api.post(`/books/${book_id}/reviews/create/`, newReview);
      toast.success('Review added successfully');
      setContent('');
      setRating(0);
    } catch (error) {
      toast.error('Failed to add review');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border p-2"
          rows="4"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Rating</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          min="1"
          max="5"
          className="w-full border p-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Review
      </button>
    </form>
  );
};

export default CreateReview;
