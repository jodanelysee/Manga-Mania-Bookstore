import { Button } from 'flowbite-react';
import React, { useEffect } from 'react';
import { useLoaderData } from 'react-router';

const SingleBook = () => {

const {_id, title, image_url, author, genre, book_description, price} = useLoaderData();

    useEffect(() => {
        // check to see if userID is in local storage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          // if userID is in local storage, redirect to login page
          window.location.replace('http://localhost:5173/login');
        }
      });

      const handleAddToCart = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userID");
        const bookId = _id; // Assuming '_id' is the book ID you want to add to the cart
        const cartObj = {
          userId: userId,
          bookId: bookId
        };
      
        try {
          // Check if the cart exists for the user
          const response = await fetch(`http://localhost:3000/cart`, {
            method: 'POST',
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(cartObj)
          });
      
          if (!response.ok) {
            throw new Error('Failed to add book to cart.');
          }
      
          const data = await response.json();
          alert("Book added to cart");
        } catch (error) {
          console.error('Error:', error.message);
          alert('Book already exists in a cart.');
        }
      };
      
      

    
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
                <Button onClick={handleAddToCart} type="submit" className='mt-5'>Add to cart</Button>
            </div>
        </div>
    );
};

export default SingleBook; 

