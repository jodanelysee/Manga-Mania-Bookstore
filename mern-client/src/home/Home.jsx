import React, { useEffect } from 'react'
import Banner from '../components/Banner'
import BestSellers from './BestSellers'
import FavBook from './FavBook'
import PromoBanner from './PromoBanner'
import OtherBooks from './OtherBooks'
import Review from './Review'
import Footer from '../components/MyFooter'

const Home = () => {

  useEffect(() => {
    // check to see if userID is in local storage
    const userID = localStorage.getItem('userID');
    if (!userID) {
      // if userID is in local storage, redirect to login page
      window.location.replace('http://localhost:5173/login');
    }
  });

  return (
    <div>
        <Banner/>
        <BestSellers/>
        <FavBook/>
        <PromoBanner/>
        <OtherBooks/>
        <Review/>
    </div>
  )
}

export default Home