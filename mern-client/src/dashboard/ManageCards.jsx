import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ManageCards = () => {
  const [allCards, setAllCards] = useState([])
  useEffect(() => {
    // check to see if userID is in local storage
    const userID = localStorage.getItem('userID');
    if (!userID) {
      // if userID is in local storage, redirect to login page
      window.location.replace('http://localhost:5173/login');
    }
      fetch(`http://localhost:3000/all-cards?userID=${userID}`).then(res => res.json()).then(data => setAllCards(data));
  }, [])

  // delete card
  const handleDelete = (id) => {
    console.log(id)
    fetch(`http://localhost:3000/card/${id}`,{
        method: "DELETE",
    }).then(res => res.json()).then(data => {
        alert("Card deleted successfully")
        //setAllCards(data);
        window.location.reload();
    })
}

  return (
    <div className='px-4 my-12'>
         <h2 className='mb-8 text-3xl font-bold'>Manage Your Cards</h2>

        {/* table for card data */}
        <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Billing Address</Table.HeadCell>
          <Table.HeadCell>Card Number</Table.HeadCell>
          <Table.HeadCell>Expiration Date</Table.HeadCell>
          <Table.HeadCell>Securtiy Code</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit/Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {
            allCards.map((card, index) => <Table.Body className="divide-y" key={card._id}>
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {card.billing_address}
            </Table.Cell>
            <Table.Cell>{card.card_number}</Table.Cell>
            <Table.Cell>{card.expiration_date}</Table.Cell>
            <Table.Cell>{card.security_code}</Table.Cell>
            <Table.Cell>
            <Link 
            className='font-medium text-blue-950 hover:underline dark:text-blue-950 mr-5'
            to={`/admin/dashboard/card/${card._id}`}
            >
                Edit
            </Link>
            <button onClick={() => handleDelete(card._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm 
            hover:bg-blue-950'>Delete</button>
            </Table.Cell>
          </Table.Row>
            </Table.Body>)
        }
      </Table>
    </div>
  )
}

export default ManageCards