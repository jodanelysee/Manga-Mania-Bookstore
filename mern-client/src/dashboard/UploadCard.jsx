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
    const handleCardUpload = (event) => {
        event.preventDefault();
        const userID = localStorage.getItem("userID")
        const form = event.target;
        const name_on_card = form.name_on_card.value;
        const card_number = form.card_number.value;
        const billing_address = form.billing_address.value;
        const expiration_date = form.expiration_date.value;
        const security_code = form.security_code.value;
        console.log(name_on_card)
        console.log(card_number)
        console.log(billing_address)
        console.log(expiration_date)
        console.log(security_code)
        const cardObj = {
          name_on_card: name_on_card,
          card_number: card_number,
          billing_address: billing_address,
          expiration_date: expiration_date,
          security_code: security_code,
          user: userID
        }

        console.log(cardObj)

        // send data to mongo

        fetch(`http://localhost:3000/${userID}/add-card`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(cardObj)
        }).then(res => res.json()).then(data => {
            //console.log(data)
            alert("Card uploaded successfully")
            form.reset();
        })
    }

    return (
        <div className='px-4 my-12'>
            <h2 className='mb-8 text-3xl font-bold'>Add Credit/Debit Card</h2>

            <form onSubmit={handleCardUpload} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
                {/* First Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="name_on_card" value="Name On Card" />
                        </div>
                        <TextInput id="name_on_card" name='name_on_card' type="text" placeholder="ex: John Doe" required />
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="billing_address" value="Billing Address" />
                        </div>
                        <TextInput id="billing_address" name='billing_address' type="text" placeholder="ex: 123 Main St, West Long Branch, NJ, 07764" required />
                    </div>
                </div>
                {/* Second Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="card_number" value="Card Number" />
                        </div>
                        <TextInput id="card_number" name='card_number' type="text" placeholder="Enter Card Number" required />
                    </div>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="expiration_date" value="Expiration Date" />
                        </div>
                        <TextInput id="expiration_date" name='expiration_date' type="text" placeholder="Enter Card Expiration Date" required />
                    </div>
                </div>
                {/* Third Row */}
                <div className='flex gap-8'>
                    <div className='lg:w-1/2'>
                        <div className="mb-2 block">
                            <Label htmlFor="security_code" value="CCV" />
                        </div>
                        <TextInput id="security_code" name='security_code' type="text" placeholder="Enter Card CCV" required />
                    </div>
                </div>
                <Button type="submit" className='mt-5'>Upload</Button>
            </form>
        </div>
    )
}

export default UploadBook