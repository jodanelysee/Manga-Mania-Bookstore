import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// react icons for stars
import {FaStar} from "react-icons/fa6"
import { Avatar } from 'flowbite-react';
//import {} from +../assets

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Review = () => {
  return (
    <div className='my-12 px-4 lg:px-24'>
        <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>Our Customers</h2>

        <div>
        <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg boarder-spacing-2'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-5'>
                  <p className='mb-7'>My son is a big anime/manga. For his recent birthday, I decided to try Manga Mania out
                  and putchased one of his favorite manga for him. He loves it. Thank you to the peeps at manga mania, thank you for helping me make my
                  son's birthday special! </p>
                    <Avatar rounded className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium '>GokuFan101</h5>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg boarder-spacing-2'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-5'>
                  <p className='mb-7'>This is the best invention since the wheel. I had an old collection of Demon Slayer manga just lying around
                  because I lost intrerest. With Manga mania, I was able to sell this to a Demon Slayer friend and it was hassle free! I will be using
                  Manga Mania from now on.</p>
                    <Avatar rounded className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium '>LuffyFan101</h5>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg boarder-spacing-2'>
            <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                    <FaStar/>
                </div>

                {/* text */}
                <div className='mt-5'>
                  <p className='mb-7'>I had to get my hands on that new My Hero Academia chapter to finish my collection. Every other place has it overpriced, but luckily 
                  someone on managa mania had a fairly new version of that chapter and I could not pass up on this opportunity.</p>
                    <Avatar rounded className='w-10 mb-4'/>
                    <h5 className='text-lg font-medium '>DekuFan101</h5>
                </div>
            </div>
        </SwiperSlide>

      </Swiper>
        </div>
    </div>
  )
}

export default Review