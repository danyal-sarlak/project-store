
import React, { useState } from "react";
import Header from "../Components/Header";
import Topbar from "../Components/Topbar";
import ImageSlider from "../Components/Slider";
import Products from "../pages/Products";
import Footer from "../Components/Footer";

const Home = () => {
  

  return (
    <div className="grid grid-cols-11 h-screen">
      <div className="col-start-1  bg-yellow-600 col-end-12">
        <Topbar />
      </div>

      <div className="col-start-2 z-10 md:px-6 bg-slate-200 col-end-11 flex items-center">
        <Header  />
      </div>

      <div className="col-start-2 z-0 md:px-6 bg-slate-200 col-end-11">
        <ImageSlider />
      </div>

      <div className="col-start-2  md:px-6 bg-slate-200 col-end-11">
        <Products  />
      </div>

      <div className="col-start-1  col-end-12 bg-yellow-600">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
/* import React from "react";
import Header from "../Components/Header";
import Topbar from "../Components/Topbar";
import ImageSlider from "../Components/Slider";
import Products from "../pages/Products";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="grid grid-cols-11 grid-rows-[56px_auto_auto_auto_56px] h-screen">
     
      <div className="row-start-1 row-end-2 col-start-1 col-end-12 bg-yellow-600">
        <Topbar />
      </div>

     
      <div className="row-start-2 row-end-3 col-start-2 z-10 md:px-6 bg-slate-200 col-end-11 flex items-center">
        <Header />
      </div>

     
      <div className="row-start-3 row-end-4 col-start-2 z-0 md:px-6 bg-slate-200 col-end-11">
        <ImageSlider />
      </div>

      
      <div className="row-start-4 row-end-5 col-start-2 md:px-6 bg-slate-200 col-end-11">
        <Products />
      </div>

     
      <div className="row-start-5 row-end-6 col-start-1 col-end-12 bg-yellow-600">
        <Footer />
      </div>
    </div>
  );
};

export default Home;

 */