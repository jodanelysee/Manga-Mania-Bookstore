import React, { useEffect, useState } from 'react'
import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [books, setBooks] = useState([]);
  const userID = localStorage.getItem('userID');
  let searchTerm;

  useEffect(() => {
    // check to see if userID is in local storage
    if (!userID) {
      // if userID is not in local storage, redirect to login page
      window.location.replace('http://localhost:5173/login');
    }
  }, [userID]); // Add dependency to ensure useEffect runs only when userID changes

  useEffect(() => {
    searchTerm = localStorage.getItem('searchTerm');
    fetch(`http://localhost:3000/book-search?search=${searchTerm}`)
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div className='mt-28 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center'>Search Results</h2>
      <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
        {
          books.length > 0 ?
            books.map((book, i) => {
              // Check if the book's user field matches the logged-in user's ID
              if (book.user !== userID) {
                return (
                  <Card key={i}>
                    <Link to={`/book/${book._id}`}>
                      <img src={book.image_url} alt="" className='h-96' />
                      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        <p>{book.title}</p>
                      </h5>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                      </p>
                    </Link>
                  </Card>
                );
              } else {
                return null; // If the book belongs to the user, don't render it
              }
            }) :
            <div>
              <h2 className='font-bold'>No Results.</h2>
            </div>
        }
      </div>
    </div>
  )
}

export default Search;
