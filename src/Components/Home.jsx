/* import React, { useState } from "react";
import Header from "../Components/Header";
import Topbar from "../Components/Topbar";
import ImageSlider from "../Components/Slider";
import Products from "../pages/Products";
import Footer from "../Components/Footer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  return (
    <div className="grid  grid-cols-11 h-screen">
      <div className="col-start-1 bg-yellow-600 col-end-12">
        <Topbar />
      </div>

      <div className="col-start-2 z-10 md:px-6 bg-slate-200 col-end-11 flex items-center ">
        <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      </div>

      <div className="col-start-2 z-0 md:px-6 bg-slate-200  col-end-11">
        <ImageSlider />
      </div>

      <div className="col-start-2 md:px-6 bg-slate-200 col-end-11">
        <Products selectedCategory={selectedCategory} />
      </div>

      <div className="col-start-1 col-end-12 bg-yellow-600">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
 */
import React, { useState } from "react";
import Header from "../Components/Header";
import Topbar from "../Components/Topbar";
import ImageSlider from "../Components/Slider";
import Products from "../pages/Products";
import Footer from "../Components/Footer";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="grid grid-cols-11 h-screen">
      <div className="col-start-1 bg-yellow-600 col-end-12">
        <Topbar />
      </div>

      <div className="col-start-2 z-10 md:px-6 bg-slate-200 col-end-11 flex items-center">
        <Header selectedCategory={selectedCategory} onCategorySelect={handleCategorySelect} />
      </div>

      <div className="col-start-2 z-0 md:px-6 bg-slate-200 col-end-11">
        <ImageSlider />
      </div>

      <div className="col-start-2 md:px-6 bg-slate-200 col-end-11">
        <Products selectedCategory={selectedCategory} />
      </div>

      <div className="col-start-1 col-end-12 bg-yellow-600">
        <Footer />
      </div>
    </div>
  );
};

export default Home;
