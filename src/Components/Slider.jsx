/* import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// این فایل را برای استایل‌های دلخواه خود اضافه کنید

 function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute right-4 top-1/2 transform -translate-y-1/2`}
      style={{ ...style, display: "block", zIndex: 1 }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} absolute left-4 top-1/2 transform -translate-y-1/2`}
      style={{ ...style, display: "block", zIndex: 1 }}
      onClick={onClick}
    />
  );
}
 
export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  return (
    <div className="relative w-full h-full">
      <Slider {...settings}>
        <div className="w-full h-full flex justify-center items-center">
          <img className="w-full h-full object-cover" src="./images/dress.webp" alt="Shoes" />
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <img className="w-full h-full object-cover" src="./images/dress2.webp" alt="Shoes" />
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <img className="w-full h-full object-cover" src="./images/dress.webp" alt="Shoes" />
        </div>
        <div className="w-full h-full flex justify-center items-center">
          <img className="w-full h-full object-cover" src="./images/dress.webp" alt="Shoes" />
        </div>
        <div className="w-full h-full flex justify-center items-center ">
          <img className="w-full h-full object-cover" src="./images/dress.webp" alt="Shoes" />
        </div>
      </Slider>
    </div>
  );
} */

/////////////////////////////////////////////////////////////// 
/*   import React, { useState } from 'react';
  import Box from '@mui/material/Box';
  import IconButton from '@mui/material/IconButton';
  import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
  import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
  import { styled } from '@mui/material/styles';
  
  // Styled component برای تصاویر
  const Image = styled('img')({
    width: '100%',
    height: 'auto',
    objectFit: 'cover',
  });
  
  const images = [
    'https://via.placeholder.com/800x400?text=Image+1',
    'https://via.placeholder.com/800x400?text=Image+2',
    'https://via.placeholder.com/800x400?text=Image+3',
  ];
  
  const SliderComponent = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrevious = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    };
  
    const handleNext = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    return (
      <Box sx={{ position: 'relative', width: '800px', overflow: 'hidden' }}>
        <Image src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
          }}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 0,
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    );
  };
  
  export default SliderComponent;
  

 */
/*   import React, { useState } from 'react';

  const images = [
    '/images/dress.webp',
    '/images/dress2.webp',
  ];
  
  const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((currentIndex + 1) % images.length);
    };
  
    const prevSlide = () => {
      setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    };
  
    return (
      <div className="relative w-full h-full">
        <div className="overflow-hidden w-full h-full">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-2 rounded-full"
        >
          &larr;
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-500 bg-opacity-50 text-white p-2 rounded-full"
        >
          &rarr;
        </button>
      </div>
    );
  };
  
  export default ImageSlider;
   */
  ///////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/* import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import '../styleSlider/styles.css'


// import required modules
import { Navigation } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-96  ">
        <SwiperSlide>
          <img src="./images/shoes.jpg"   alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img src="./images/slider1.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img src="./images/dress2.webp" alt="" />
        </SwiperSlide>
        
       
      </Swiper>
    </>
  );
}
 */
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import '../styleSlider/styles.css'

// import required modules
import { Pagination } from 'swiper/modules';

export default function App() {
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
        <SwiperSlide>
        <img src="./images/dress6.png"  alt="" />
        </SwiperSlide>
        <SwiperSlide>
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

