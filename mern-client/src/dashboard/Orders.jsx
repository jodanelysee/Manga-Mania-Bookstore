import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react';

const Orders = () => {
  const [allOrders, setAllOrders] = useState([])
  useEffect(() => {
    // check to see if userID is in local storage
    const userID = localStorage.getItem('userID');
    if (!userID) {
      // if userID is in local storage, redirect to login page
      window.location.replace('http://localhost:5173/login');
    }
      fetch(`http://localhost:3000/all-orders?userID=${userID}`).then(res => res.json()).then(data => setAllOrders(data));
  }, [])

  return (
<div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Orders</h2>

      <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Items</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>Shipping Address</Table.HeadCell>
          <Table.HeadCell>Card</Table.HeadCell>
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
              <Table.Cell>{order.card}</Table.Cell>
            </Table.Row>
          </Table.Body>
        ))}
      </Table>
    </div>
  )
}

export default Orders