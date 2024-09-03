
import React, { useContext } from "react";
import { LikesContext } from '../Contexts/LikesProvider'; // وارد کردن LikesContext
import { FaRegHeart } from "react-icons/fa";
import { TbBasketCheck } from "react-icons/tb";
import { SlBasket } from "react-icons/sl";
import { useSelector } from "react-redux";
import { basketState } from "../redux/baketSlice";

export default function Footer() {
    const { likes } = useContext(LikesContext); // دریافت likes از Context
    const { items } = useSelector(basketState);

    // محاسبه مجموع quantity از تمام آیتم‌ها
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    // محاسبه مجموع قیمت از تمام آیتم‌ها
    const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <div className="flex justify-between px-1 sm:px-5 md:px-8 items-center">
            <div className="h-14 flex items-center gap-x-1  md:gap-x-5 ">
                <div className="flex items-center pl-5 gap-2 ">
                    <TbBasketCheck className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6 w-4 h-4" />
                    <p className="text-white flex gap-1  md:text-sm text-xs "><span className=" hidden md:flex">Items in cart:</span> {totalQuantity}</p>
                </div>
                <div className="h-16 flex items-center gap-1 md:gap-2 ">
                    <FaRegHeart className="text-white sm:w-5 sm:h-5 md:w-6 md:h-6 w-4 h-4" />
                    <p className="text-white flex gap-1   md:text-sm text-xs "><span className="hidden md:flex">Wish list</span> ({Object.keys(likes).filter(id => likes[id] > 0).length})</p>
                </div>
            </div>
            <div className="flex items-center gap-x-1 md:gap-x-2">
                <SlBasket className=" hidden md:flex md:w-6 md:h-6 w-4 h-4 text-white" />
                <p className="text-white  md:text-sm text-xs ">Total Price: ${totalPrice}</p>
            </div>
        </div>
    );
}
