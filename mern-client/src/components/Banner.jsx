import { useEffect, useState } from 'react';
import BannerCard from '../home/BannerCard'
import { Form, useNavigate } from 'react-router-dom';



const Banner = () => {

    const [searchTerm, setSearchTerm] = useState("")
    const navigate = useNavigate();
    console.log(searchTerm)

    const handleSearch = (event) => {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);    
        urlParams.set("searchTerm", searchTerm)
        const searchQuery = urlParams.toString()
        localStorage.removeItem("searchTerm");
        localStorage.setItem("searchTerm", searchTerm);
        navigate(`/book-search?${searchQuery}`)
    }

  return (
    <div className='px-4 lg:px-24 bg-gray-300 flex items-center'>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
            { /* left side */ }
            <div className='md:w-1/2 space-y-8 h-full'>
                <h2 className='text-5xl font-bold leading-snug text-black'>Buy and Sell Your Manga <span 
                className='text-blue-950'>for the Best Prices</span></h2>
                <p className='md:w-4/5'>Welcome to Manga Mania! You have now found the anime community's best kept secret, stand tall and be proud!
                At Manga Mania, you and a community of manga fans will be able to sell your manga and/or you will be able to buy from others.</p>
                <form onSubmit={handleSearch}>
                    <div>
                        <input 
                        type="text" 
                        placeholder='Search for manga' 
                        className='py-2 px-2 rounded-s-sm outline-none'
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        />
                        <button className='bg-blue-950 px-6 py-2 text-white font-medium hover:bg-black
                        transition-all ease-in duration-200'>Search</button>
                    </div>
                </form>
            </div>

            { /* right side */ }
            <div>
                <BannerCard></BannerCard>
            </div>
        </div>
    </div>
  )
}

export default Banner