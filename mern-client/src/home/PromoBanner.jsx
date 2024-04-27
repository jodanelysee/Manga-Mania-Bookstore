import React from 'react'
import { Link } from 'react-router-dom'
import cherry_blossom from "../assets/cherryblossom.png"

const PromoBanner = () => {
  return (
    <div className='mt-16 py-12 bg-gray-300 px-4 lg:px-24'>
    <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='md:w-1/2'>
            <h2 className='text-4xl font-bold mb-6 leading-snug'>Spring Sale Active Now!</h2>
            <Link to="/shop" className='block'><button className='bg-blue-950 text-white font-semibold px-5 py-2 
                rounded hover:bg-black transition-all duration-300'>Shop Spring Sale</button></Link>
        </div>

        <div>
            <img src={cherry_blossom} alt="" className='w-96' />
        </div>
    </div>
    </div>
    
  )
}

export default PromoBanner