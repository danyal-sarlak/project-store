
  import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { basketState, removeItem } from "../redux/baketSlice";
import { IoTrashOutline } from "react-icons/io5";

export default function BasketItem({ product , invoice}) {
  const { id, name, price, quantity, image , material, details } = product;
  const { items } = useSelector(basketState);
  const dispatch = useDispatch()
  
  // محاسبه قیمت کل هر محصول
  const item = items.find((_item) => _item.id === id);
  const totalPriceForItem = item ? item.price * item.quantity : 0;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between px-2">
        <div className="flex flex-col md:flex-row">
          <div className="relative">
            <img
              src={image}
              className="w-28 h-28 p-2 rounded-2xl"
              alt={name}
            />
            <div
              className="absolute bottom-3 right-3 w-6 h-6 bg-gray-300 text-yellow-600 rounded-full transform translate-x-1/2 translate-y-1/2"
            >
              {quantity}
            </div>
          </div>

          <div className="flex flex-col p-2 gap-y-1 items-start text-left">
            <h2>{name}</h2>
            <h2>{material}</h2>
            <p className="text-gray-400">
            {details}
            </p>
            <div className="flex pt-1">
              <FaStar className="text-yellow-600" />
              <FaStar className="text-yellow-600" />
              <FaStar className="text-yellow-600" />
              <CiStar className="text-yellow-600" />
              <CiStar className="text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2 pr-4">
        <p className="text-right ">{totalPriceForItem}$</p>
        <div className="bg-red-500 p-2   rounded-sm ">
        <IoTrashOutline className="text-white cursor-pointer" 
        onClick={() => dispatch(removeItem(product))}
        />
        </div>

        </div>
       
        
      </div>
    </div>
  );
}
