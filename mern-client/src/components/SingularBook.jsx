import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router';

const SingularBook = () => {

    useEffect(() => {
        // check to see if userID is in local storage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          // if userID is in local storage, redirect to login page
          window.location.replace('http://localhost:5173/login');
        }
      });


    const {_id, title, image_url, author, genre, book_description, price} = useLoaderData();
    
    return (
        <div className='mt-28 px-4 lg:px-24 flex'>
            <div className="mr-8">
                <img src={image_url} alt={title} className='h-96' />
            </div>
            <div>
                <h2 className="text-3xl mt-4">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">{genre}</p>
                <p className="text-lg text-gray-700">Author: {author}</p>
                <p>${price}</p>
                <p className="text-lg text-gray-700 mt-4 max-w-xl">{book_description}</p>
            </div>
        </div>
    );
};

export default SingularBook; 

