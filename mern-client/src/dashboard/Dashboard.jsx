import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput, Textarea } from 'flowbite-react';


const Dashboard = () => {

    useEffect(() => {
        // check to see if userID is in local storage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          // Handle case where userID is not found in localStorage
          window.location.replace('http://localhost:5173/login');
        }
      });

    const {first_name, last_name, email, password, address} = useLoaderData();

    const handleUserUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const userID = localStorage.getItem('userID');
        const first_name = form.first_name.value;
        const last_name = form.last_name.value;
        const email = form.email.value;
        const password = form.password.value;
        const address = form.address.value;
        console.log(first_name)
        console.log(last_name)
        console.log(email)
        console.log(password)
        console.log(address)
        const updateUserObj = {
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
            address: address
        }

        //console.log(updateUserObj)
        // update user data
        fetch(`http://localhost:3000/admin/${userID}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateUserObj)
        }).then(res => res.json()).then(data => {
            alert("Account Information updated successfully")
            //form.reset();
        })
    }

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Update Account Infromation</h2>

            <form onSubmit={handleUserUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                {/* First Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="first_name" value="First Name" />
                        </div>
                        <TextInput id="first_name" name='first_name' type="text" placeholder="First Name" required defaultValue={first_name}/>
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Last Name" />
                        </div>
                        <TextInput id="last_name" name='last_name' type="text" placeholder="Last Name" required defaultValue={last_name}/>
                    </div>
                </div>
                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput id="email" name='email' type="text" placeholder="Email" required defaultValue={email}/>
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput id="password" name='password' type="password" placeholder="Password" required defaultValue={password}/>
                    </div>
                </div>
                {/* Third Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="address" value="Address" />
                        </div>
                        <TextInput id="address" name='address' type="text" placeholder="Address" required defaultValue={address}/>
                    </div>
                </div>
                <Button type="submit" className='mt-5'>Update</Button>
            </form>
        </div>
    )
}

export default Dashboard