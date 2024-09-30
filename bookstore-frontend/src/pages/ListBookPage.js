import React from 'react';
import ListBooks from '../components/ListBooks';

const ListBookPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Books</h1>
      <ListBooks />
    </div>
  );
};

export default ListBookPage;
