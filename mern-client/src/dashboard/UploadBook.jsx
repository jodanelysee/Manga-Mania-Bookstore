import React, { useEffect } from 'react'
import { Button, Checkbox, Label, TextInput, Textarea } from 'flowbite-react';


const UploadBook = () => {

    useEffect(() => {
        // check to see if userID is in local storage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          // if userID is in local storage, redirect to login page
          window.location.replace('http://localhost:5173/login');
        }
      });
    
    // handle book submission
    const handleBookSubmit = (event) => {
        const userID = localStorage.getItem("userID")
        const purchased = false
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
        const bookObj = {
            title: title,
            author: author,
            image_url: image_url,
            genre: genre,
            book_description: book_description,
            price: parseFloat(price),
            user: userID,
            purchased: purchased
        }

        console.log(bookObj)

        // send data to mongo

        fetch("http://localhost:3000/upload-book",{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(bookObj)
        }).then(res => res.json()).then(data => {
            //console.log(data)
            alert("Manga uploaded successfully")
            form.reset();
        })
    }

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Upload Manga</h2>

            <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                {/* First Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="title" value="Manga Title" />
                        </div>
                        <TextInput id="title" name='title' type="text" placeholder="Manga Title" required />
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="author" value="Author" />
                        </div>
                        <TextInput id="author" name='author' type="text" placeholder="author" required />
                    </div>
                </div>
                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="image_url" value="Manga Image URL" />
                        </div>
                        <TextInput id="image_url" name='image_url' type="text" placeholder="Manga Image URL" required />
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="genre" value="Genre" />
                        </div>
                        <TextInput id="genre" name='genre' type="text" placeholder="genre" required />
                    </div>
                </div>
                {/* Third Row */}
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="book_description" value="Description" />
                    </div>
                    <Textarea id="book_description" name='book_description' placeholder="manga description" required className='w-full' rows={6} />
                </div>
                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="price" value="Price" />
                        </div>
                        <TextInput id="price" name='price' type="text" placeholder="Price" required />
                    </div>
                </div>
                <Button type="submit" className='mt-5'>Upload</Button>
            </form>
        </div>
    )
}

export default UploadBook