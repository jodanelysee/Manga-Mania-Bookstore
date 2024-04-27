import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

const ManageBooks = () => {
    const [allBooks, setAllBooks] = useState([])
    useEffect(() => {
      // check to see if userID is in local storage
      const userID = localStorage.getItem('userID');
      if (!userID) {
        // if userID is in local storage, redirect to login page
        window.location.replace('http://localhost:5173/login');
      }
        fetch(`http://localhost:3000/all-books?userID=${userID}`).then(res => res.json()).then(data => setAllBooks(data));
    }, [])

    // delete book
    const handleDelete = (id) => {
        console.log(id)
        fetch(`http://localhost:3000/book/${id}`,{
            method: "DELETE",
        }).then(res => res.json()).then(data => {
            alert("Book deleted successfully")
            //setAllBooks(data);
            window.location.reload();
        })
    }
  return (
    <div className='px-4 my-12'>
         <h2 className='mb-8 text-3xl font-bold'>Manage Your Manga</h2>

        {/* table for book data */}
        <Table className='lg:w-[1180px]'>
        <Table.Head>
          <Table.HeadCell>#</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
          <Table.HeadCell>Genre</Table.HeadCell>
          <Table.HeadCell>Price</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit/Manage</span>
          </Table.HeadCell>
        </Table.Head>
        {
            allBooks.map((book, index) => <Table.Body className="divide-y" key={book._id}>
                          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {index + 1}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {book.title}
            </Table.Cell>
            <Table.Cell>{book.author}</Table.Cell>
            <Table.Cell>{book.genre}</Table.Cell>
            <Table.Cell>${book.price}</Table.Cell>
            <Table.Cell>
            <Link 
            className='font-medium text-blue-950 hover:underline dark:text-blue-950 mr-5'
            to={`/admin/dashboard/edit/${book._id}`}
            >
                Edit
            </Link>
            <button onClick={() => handleDelete(book._id)} className='bg-red-600 px-4 py-1 font-semibold text-white rounded-sm 
            hover:bg-blue-950'>Delete</button>
            </Table.Cell>
          </Table.Row>
            </Table.Body>)
        }

      </Table>

    </div>
  )
}

export default ManageBooks