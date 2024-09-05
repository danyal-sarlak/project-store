
  import React from 'react';
  // Import Swiper React components
  import { Swiper, SwiperSlide } from 'swiper/react';
  
  // Import Swiper styles
  import 'swiper/css';
  import 'swiper/css/pagination';
  import 'swiper/css/autoplay';
  
  import '../styleSlider/styles.css';
  
  // import required modules
  import { Pagination, Autoplay } from 'swiper/modules';
  
  export default function App() {
    return (
      <>
        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 1000, 
            disableOnInteraction: false, 
          }}
        >
          <SwiperSlide >
            <img src="./images/slider19.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide className='p-1 bg-slate-200'>
            <img src="./images/New folder/slider10.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/New folder/slider11.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="./images/New folder/slider17.webp" alt="" />
          </SwiperSlide>
        </Swiper>
      </>
    );
  }
  


