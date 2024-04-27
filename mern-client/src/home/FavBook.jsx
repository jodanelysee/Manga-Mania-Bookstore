import React from 'react'
import favoriteBook from "../assets/FavBooks.jpg"
import { Link } from 'react-router-dom'

const FavBook = () => {
  return (
    <div className='px-4 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12'>
        <div className='md:w-1/2'>
        <img src={favoriteBook} alt="" className='rounded md:w-10/12' />
        </div>

        <div className='md:w-1/2 space-y-6'>
            <h2 className='text-5xl font-bold my-5 md:w-3/4 leading-snug'>Find Your Favorite <span 
            className='text-blue-950'>Manga Here!</span></h2>
            <p className='mb-10 text-lg md:w-5/6'>From the infamous Dragon Ball manga by the notorious Akira Toriyama, to the up and coming superstar managa, 
            Jujutsu Kaisen, by the brilliant Gege Akutami, we should have you are looking for!</p>
                {/* stats */}
                <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
                    <div>
                        <h3 className='text-3xl font-bold'>The #1 Go To Spot for Fans</h3>
                        <p className='text-base'>Manga Mania has been my go to place to purchase Manga, I love it. You guys should check it out! - MangaFan101</p>
                    </div>
                </div>
                <p></p>
                <Link to="/shop" className='mt-12 block'><button className='bg-blue-950 text-white font-semibold px-5 py-2 
                rounded hover:bg-black transition-all duration-300'>Explore More</button></Link>
        </div>
    </div>
  )
}

export default FavBook