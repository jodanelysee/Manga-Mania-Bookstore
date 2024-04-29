import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const userID = localStorage.getItem('userID');
    if (!userID) {
      window.location.replace('http://localhost:5173/login');
    } else {
      fetch(`http://localhost:3000/all-orders?userID=${userID}`)
        .then(res => res.json())
        .then(async data => {
          // Fetch card details for each order
          const ordersWithDetails = await Promise.all(
            data.map(async order => {
              const cardResponse = await fetch(`http://localhost:3000/card/${order.card}`);
              const cardData = await cardResponse.json();
              // Fetch user details to get shipping address
              const userResponse = await fetch(`http://localhost:3000/admin/${userID}`);
              const userData = await userResponse.json();
              return { 
                ...order, 
                card_number: cardData.card_number,
                shipping_address: userData.address // Assuming address is a field in the user document
              };
            })
          );
          setAllOrders(ordersWithDetails);
        })
        .catch(error => console.error('Error fetching orders:', error));
    }
  }, []);

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Orders</h2>

      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Items</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Shipping Address</Table.HeadCell>
          <Table.HeadCell>Card Number</Table.HeadCell> {/* Updated table header */}
        </Table.Head>
        {allOrders.map((order, index) => (
          <Table.Body key={index} className="divide-y">
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {index + 1}
              </Table.Cell>
              <Table.Cell>
                <ul>
                  {order.books.map((book, idx) => (
                    <li key={idx}>{book.title}</li>
                  ))}
                </ul>
              </Table.Cell>
              <Table.Cell>${order.totalPrice}</Table.Cell>
              <Table.Cell>{order.shipping_address}</Table.Cell>
              <Table.Cell>{order.card_number}</Table.Cell> {/* Display card number */}
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  );
};

export default Orders;
