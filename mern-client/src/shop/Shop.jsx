import React, { useEffect, useState } from 'react'

import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect( () => {
    fetch('http://localhost:3000/all-books').then(res => res.json()).then(data => setBooks(data));
  }, [])

  useEffect(() => {
    // check to see if userID is in local storage
    const userID = localStorage.getItem('userID');
    if (!userID) {
      // if userID is in local storage, redirect to login page
      window.location.replace('http://localhost:5173/login');
    }
    
  });


  return (
    <div className='mt-28 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center'>All Manga</h2>

        <div className='grid gap-8 my-12 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1'>
          {
            books.map((book, i) => <Card
            key = {i}
            >
              <Link to = {`/book/${book._id}`}>
              <img src={book.image_url} alt="" className='h-96'/>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                {book.title}
                </p>
              </h5>
              </Link>
            </Card>)
          }
        </div>
    </div>
  )
}

export default Shop