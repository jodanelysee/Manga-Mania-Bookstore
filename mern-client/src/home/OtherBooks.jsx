import React, { useEffect, useState } from 'react';
import BookCards from '../components/BookCards';

const OtherBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/all-books")
      .then(res => res.json())
      .then(data => {
        // Calculate the starting index to slice the array
        const startIndex = data.length > 6 ? data.length - 6 : 0;
        setBooks(data.slice(startIndex));
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <BookCards books={books} headline="Other Books" />
    </div>
  );
};

export default OtherBooks;
