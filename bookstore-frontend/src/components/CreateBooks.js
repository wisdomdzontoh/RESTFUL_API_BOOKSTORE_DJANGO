import React, { useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const CreateBooks = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isbnNumber, setIsbnNumber] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBook = {
      title,
      author,
      published_date: publishedDate,
      isbn_number: isbnNumber,
      price,
      stock,
      description,
    };

    try {
      const response = await api.post('/books/', newBook);
      toast.success('Book created successfully!');
      // Reset form fields
      setTitle('');
      setAuthor('');
      setPublishedDate('');
      setIsbnNumber('');
      setPrice('');
      setStock('');
      setDescription('');
    } catch (error) {
      toast.error('Failed to create book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a New Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter book title"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter author name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Published Date</label>
          <input
            type="date"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">ISBN Number</label>
          <input
            type="text"
            value={isbnNumber}
            onChange={(e) => setIsbnNumber(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter ISBN number (13 digits)"
            maxLength="13"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter price"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter stock quantity"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 p-2 rounded-md"
            placeholder="Enter book description"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Create Book'}
        </button>
      </form>
    </div>
  );
};

export default CreateBooks;
