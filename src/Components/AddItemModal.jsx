/////////////////////
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { basketState, addItem } from "../redux/baketSlice";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { GrDeliver } from "react-icons/gr";
import { MdOutlineSecurity } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { CiCirclePlus } from "react-icons/ci";
import { CiCircleMinus } from "react-icons/ci";
import { IoCloseCircleSharp } from "react-icons/io5";
export default function AddItemModal({ product, closeModal }) {
  const dispatch = useDispatch();
  const { items } = useSelector(basketState);
  

  // Find the item in the basket
  const basketItem = items.find((item) => item.id === product.id);

  // State for managing quantity
  const [quantity, setQuantity] = useState(basketItem?.quantity || 1);

  // Increment the quantity
  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrement the quantity
  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Handle confirmation and close modal
  const handleDone = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addItem(product));
    }
    closeModal();
  };

  const tootalPrice = quantity * product.price

  return createPortal(
    <div
      className="flex justify-center z-20 items-center  fixed top-0 left-0  w-full bg-black bg-opacity-50 h-screen"
      onClick={closeModal}
      
    >
      
      <div
        className="bg-white p-5 rounded-lg md:w-[400px] w-[300px] max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end pb-2">
            <IoCloseCircleSharp
              className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={closeModal}
            />
          </div>
        <img
          src={product.image}
          alt={product.name}
          className="rounded-xl mb-4 h-56"
        />

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <p>Price: {product.price}$</p>
        </div>

        <p className="mb-2">{product.matrail}</p>
        <p className="text-gray-400 mb-4">{product.details}</p>

        <div className="flex mb-4">
          <FaStar className="text-yellow-600" />
          <FaStar className="text-yellow-600" />
          <FaStar className="text-yellow-600" />
          <CiStar className="text-yellow-600" />
          <CiStar className="text-yellow-600" />
        </div>

        <div className="flex  border-gray-300 border-2 rounded-xl w-fit h-fit items-center  justify-center mb-4">
          <button
            onClick={decrementQuantity}
            className="py-2 px-3  text-white rounded-l-lg border-r border-gray-300 hover:bg-red-400"
            disabled={quantity <= 1} // Disable button if quantity is 1
          >
            <CiCircleMinus className="text-red-600 w-5 h-5"/>
          </button>
          
          <p className="text-xl w-5 flex items-center justify-center ">{quantity}</p>
          <button
            onClick={incrementQuantity}
            className="py-2 px-3  text-white rounded-r-lg border-l border-gray-300 hover:bg-green-400"
          >
            <CiCirclePlus className="text-green-600 w-5 h-5"/>
          </button>
          
        </div>

        <div className="flex gap-x-2 mb-4">
          <span className="border border-yellow-600 text-yellow-600 p-1 text-center w-8 h-8 rounded-md">
            M
          </span>
          <span className="border border-yellow-600 text-yellow-600 p-1 text-center w-8 h-8 rounded-md">
            S
          </span>
          <span className="border border-yellow-600 text-yellow-600 p-1 text-center w-8 h-8 rounded-md">
            L
          </span>
          <span className="border border-yellow-600 text-yellow-600 p-1 text-center w-8 h-8 rounded-md">
            XL
          </span>
          <span className="border border-yellow-600 text-yellow-600 p-1 text-center w-8 h-8 rounded-md">
            XXL
          </span>
        </div>

        <div className="flex items-center gap-x-2 mb-4">
          <GrDeliver className="text-gray-500 w-5 h-5" />
          <div>
            <p>Delivery limit</p>
            <p className="text-gray-500 text-xs">Free delivery within 50 kms</p>
          </div>
        </div>

        <div className="flex items-center gap-x-2 mb-4">
          <MdOutlineSecurity className="text-gray-500 w-5 h-5" />
          <div>
            <p>Return Policy</p>
            <p className="text-gray-500 text-xs">
              Within 5 days of product delivery
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex justify-start gap-x-2">
            <button
              onClick={handleDone}
              className="p-2 bg-white border border-yellow-600 text-yellow-600 hover:bg-yellow-500 hover:text-white rounded-lg"
            >
              Add to cart
            </button>
            <button
              onClick={closeModal}
              className="p-2  hover:bg-gray-400 hover:text-white text-gray-400 rounded-lg"
            >
              Cancel
            </button>
          </div>
          <div className="flex gap-x-1">
            <SlBasket className="w-5 h-5 text-gray-500"/>
            <p className="text-gray-500">{tootalPrice}$</p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
