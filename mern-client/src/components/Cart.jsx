import { Label, Select } from 'flowbite-react';
import React, { useState, useEffect } from 'react';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]);
  const [creditCards, setCreditCards] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const userID = localStorage.getItem("userID");
    const form = event.target;
    const shipping_address = address;
    const card = creditCard;
  
    const orderObj = {
      shipping_address: shipping_address,
      card: card,
      user: userID,
      books: cart.map(book => ({ title: book.title, price: book.price })),
      totalPrice: totalPrice
    };
    console.log(orderObj)
  
    fetch(`http://localhost:3000/place-order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(orderObj)
    })
    .then(res => res.json())
    .then(data => {
      

  
      // Delete books from cart
      cart.forEach(book => {
        fetch(`http://localhost:3000/book/${book._id}`, {
          method: 'DELETE',
          headers: {
            "Content-type": "application/json"
          }
        })
        .then(res => {
          if (res.ok) {
            console.log("Book deleted from the database.");
            window.location.reload();
            // Optionally, update your UI after successful deletion
            alert("Order successful");
          } else {
            console.error('Failed to delete book from the database.');
          }
        })
        .catch(error => {
          console.error('Error:', error.message);
          alert('Failed to delete book from the database.');
        });
      });
    })
    .catch(error => {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    });
  };
  
  

  // Fetch user's credit cards
  useEffect(() => {
    const userId = localStorage.getItem("userID");
    fetch(`http://localhost:3000/all-cards?userID=${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Card: ", data);
        setCreditCards(data);
      })
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  // Fetch user's address
  useEffect(() => {
    const userId = localStorage.getItem("userID");
    fetch(`http://localhost:3000/admin/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("User address response:", data); // Log the response
        setAddresses([data.address]);
      })
      .catch(error => console.error('Error fetching user address:', error));
  }, []);

  useEffect(() => {
    // check to see if userID is in local storage
    const userID = localStorage.getItem('userID');
    //const searchTerm = localStorage.getItem('searchTerm');
    if (!userID) {
      // if userID is in local storage, redirect to login page
      window.location.replace('http://localhost:5173/login');
    }
  });

  const handleRemoveFromCart = (bookId) => {
    const userId = localStorage.getItem("userID");
    fetch(`http://localhost:3000/cart/${userId}/${bookId}`, {
      method: 'DELETE',
      headers: {
        "Content-type": "application/json"
      },
    })
      .then(res => {
        if (res.ok) {
          console.log("Book removed from cart.");
          //refresh the window
          window.location.reload();
          // Optionally, update your cart state or UI after successful removal
        } else {
          console.error('Failed to remove book from cart.');
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        alert('Failed to remove book from cart.');
      });
  };


  const handleCardChange = (event) => {
    console.log(setCreditCard)
    setCreditCard(event.target.value);
  };


  const handleAddressChange = (event) => {
    console.log(setAddress)
    setAddress(event.target.value);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    fetch(`http://localhost:3000/cart/${userId}`)
      .then(res => res.json())
      .then(data => {
        console.log("Response from server:", data); // Log the response
        if (data && data.books && Array.isArray(data.books)) {
          setBooks(data.books);
        } else {
          console.error("Books data is not an array or missing:", data);
        }
      })
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  useEffect(() => {
    // Fetch book details for each book ID in the cart
    if (books.length > 0) {
      Promise.all(books.map(bookId =>
        fetch(`http://localhost:3000/book/${bookId}`)
          .then(res => res.json())
      ))
        .then(bookDetails => {
          setCart(bookDetails);
          // Calculate total price based on fetched book details
          const totalPrice = bookDetails.reduce((acc, book) => acc + book.price, 0);
          setTotalPrice(totalPrice);
        })
        .catch(error => console.error('Error fetching book details:', error));
    }
  }, [books]);

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Cart</h2>
      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {cart.map((book, index) => (
              <li key={index} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>{book.title}</h3>
                      <p className="ml-4">${book.price}</p>
                    </div>
                    <p className="text-sm text-gray-500">{book.author}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => handleRemoveFromCart(book._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mx-auto w-full bg-white flex justify-center">
        <div className="grid min-h-screen grid-cols-10">
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Checkout<span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
              <form action="" className="mt-10 flex flex-col space-y-4">
                <div>
                  <div>
                    <Label htmlFor='inputCard' value="Select Card" />
                  </div>
                  <Select
  id='inputCard'
  name='inputCard'
  className='w-full rounded'
  value={creditCard}
  onChange={handleCardChange}
>
  {creditCards.map((card) => (
    <option key={card._id} value={card._id}>
      {card.card_number}
    </option>
  ))}
</Select>
                </div>
                <div>
                  <div>
                    <Label htmlFor='inputAddress' value='Select Shipping Address' />
                  </div>
                  <Select
  id='inputAddress'
  name='inputAddress'
  className='w-full rounded'
  value={address}
  onChange={handleAddressChange}
>
  {addresses.map((address, index) => (
    <option key={index} value={address}>
      {address}
    </option>
  ))}
</Select>

                </div>
              </form>
              <p>Total Price: ${totalPrice}</p> {/* Display total price */}
              <button type="button" onClick={handleSubmit} className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
