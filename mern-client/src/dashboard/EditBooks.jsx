import React, { useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput, Textarea } from 'flowbite-react';


const EditBooks = () => {

    useEffect(() => {
        // check to see if userID is in local storage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          // if userID is in local storage, redirect to login page
          window.location.replace('http://localhost:5173/login');
        }
      });

    const {id} = useParams();
    const {title, author, image_url, genre, book_description, price} = useLoaderData();

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;

        const title = form.title.value;
        const author = form.author.value;
        const image_url = form.image_url.value;
        const genre = form.genre.value;
        const book_description = form.book_description.value;
        const price = form.price.value;
        console.log(title)
        console.log(author)
        console.log(image_url)
        console.log(genre)
        console.log(book_description)
        console.log(price)
        const updateBookObj = {
            title: title,
            author: author,
            image_url: image_url,
            genre: genre,
            book_description: book_description,
            price: price
        }

        // console.log(bookObj)
        // update book data
        fetch(`http://localhost:3000/book/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateBookObj)
        }).then(res => res.json()).then(data => {
            alert("Manga updated successfully")
            //form.reset();
        })
    }

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Update Manga</h2>

            <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                {/* First Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Manga Title" />
                        </div>
                        <TextInput id="title" name='title' type="text" placeholder="Manga Title" required defaultValue={title}/>
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="author" value="Author" />
                        </div>
                        <TextInput id="author" name='author' type="text" placeholder="author" required defaultValue={author}/>
                    </div>
                </div>
                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="image_url" value="Manga Image URL" />
                        </div>
                        <TextInput id="image_url" name='image_url' type="text" placeholder="Manga Image URL" required defaultValue={image_url}/>
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="genre" value="Genre" />
                        </div>
                        <TextInput id="genre" name='genre' type="text" placeholder="genre" required defaultValue={genre}/>
                    </div>
                </div>
                {/* Third Row */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="book_description" value="Description" />
                    </div>
                    <Textarea id="book_description" name='book_description' placeholder="manga description" required className='w-full' rows={6} defaultValue={book_description}/>
                </div>
                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Price" />
                        </div>
                        <TextInput id="price" name='price' type="text" placeholder="Price" required defaultValue={price}/>
                    </div>
                </div>
                <Button type="submit" className='mt-5'>Update</Button>
            </form>
        </div>
    )
}

export default EditBooks