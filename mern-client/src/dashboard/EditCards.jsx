import React, { useEffect } from 'react'
import { useLoaderData, useParams } from 'react-router-dom';
import { Button, Checkbox, Label, TextInput, Textarea } from 'flowbite-react';

const EditCards = () => {

    useEffect(() => {
        // check to see if userID is in local storage
        const userID = localStorage.getItem('userID');
        if (!userID) {
          // if userID is in local storage, redirect to login page
          window.location.replace('http://localhost:5173/login');
        }
      });

    const {id} = useParams();
    const {name_on_card, billing_address, card_number, expiration_date, security_code} = useLoaderData();

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;

        const name_on_card = form.name_on_card.value;
        const billing_address = form.billing_address.value;
        const card_number = form.card_number.value;
        const expiration_date = form.expiration_date.value;
        const security_code = form.security_code.value;
        console.log(name_on_card)
        console.log(billing_address)
        console.log(card_number)
        console.log(expiration_date)
        console.log(security_code)
        const updateCardObj = {
            name_on_card: name_on_card,
            billing_address: billing_address,
            card_number: card_number,
            expiration_date: expiration_date,
            security_code: security_code
        }

        // console.log(CardObj)
        // update card data
        fetch(`http://localhost:3000/card/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(updateCardObj)
        }).then(res => res.json()).then(data => {
            alert("Card updated successfully")
            //form.reset();
        })
    }

  return (
    <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Update Cards</h2>

            <form onSubmit={handleUpdate} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                {/* First Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="name_on_card" value="Card Number" />
                        </div>
                        <TextInput id="name_on_card" name='name_on_card' type="text" placeholder="Card Number" required defaultValue={name_on_card}/>
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="billing_address" value="Billing Address" />
                        </div>
                        <TextInput id="billing_address" name='billing_address' type="text" placeholder="Billing Address" required defaultValue={billing_address}/>
                    </div>
                </div>
                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="card_number" value="Card Number" />
                        </div>
                        <TextInput id="card_number" name='card_number' type="text" placeholder="Card Number" required defaultValue={card_number}/>
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="expiration_date" value="Expiration Date" />
                        </div>
                        <TextInput id="expiration_date" name='expiration_date' type="text" placeholder="Expiration Date" required defaultValue={expiration_date}/>
                    </div>
                </div>
                {/* Third Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="securtiy_code" value="Security Code" />
                        </div>
                        <TextInput id="security_code" name='securtiy_code' type="text" placeholder="Security Code" required defaultValue={security_code}/>
                    </div>
                </div>
                <Button type="submit" className='mt-5'>Update</Button>
            </form>
        </div>
  )
}

export default EditCards