

/////////////////////////////////////////////////////tru revesh

import React, { useState, useContext, useEffect } from "react";
import { BiSolidTShirt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { CategoriesContext } from '../Contexts/CategoriesContext';
import Basket from "./Basket";
import { useNavigate } from "react-router-dom";
import supabase from "../supaBase";// فرض بر این است که supabaseClient را درست تنظیم کرده‌اید

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBasketOpen, setIsBasketOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); // State برای ذخیره آیتم انتخاب شده
    const [userName, setUserName] = useState(null); // State برای ذخیره نام کاربر
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const { categories, filterProductsByCategory } = useContext(CategoriesContext);

    useEffect(() => {
        // بازیابی آیتم انتخاب شده از Local Storage
        const savedItem = localStorage.getItem("selectedItem");
        if (savedItem) {
            setSelectedItem(savedItem);
            if (categories.includes(savedItem)) {
                filterProductsByCategory(savedItem);
            }
        }
    }, [categories]);

    useEffect(() => {
        // بررسی توکن و بارگذاری نام کاربر
        const token = localStorage.getItem('token');
        if (token) {
            (async () => {
                const { data, error } = await supabase
                    .from('users')
                    .select('username')
                    .eq('token', token)// فرض بر این است که شما توکن را به عنوان شناسه در جدول users دارید
                    .single();
                
                if (error) {
                    console.error('Error:', error.message);
                    return;
                }

                if (data) {
                    setUserName(data.username);
                }
            })();
        }
    }, []);

    const handleCategoriesClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategorySelect = (category) => {
        filterProductsByCategory(category);
        setIsDropdownOpen(false);
        handleMenuItemClick(category); // تنظیم آیتم انتخاب شده
    };

    const handleBasketClick = () => {
        setIsBasketOpen(!isBasketOpen);
    };

    const closeBasket = () => {
        setIsBasketOpen(false);
    };

    const handleAccountClick = () => {
        navigate("/login");
    };

    const handleMenuItemClick = (item) => {
        setSelectedItem(item);
        localStorage.setItem("selectedItem", item); // ذخیره آیتم انتخاب شده در Local Storage
    };
    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="w-full flex items-center justify-between pr-2 bg-slate-200 h-20">
            <div className="flex md:px-3  px-0 items-center ">
                <div className=" gap-x-5 py-5 px-6 hidden md:flex items-center">
                    <BiSolidTShirt className="text-orange-400  md:w-8 md:h-8" />
                    <p className="text-orange-400 lg:text-2xl font-semibold text-xl">
                        Minimal <span className="text-2xl font-semibold text-red-500">shop</span>ping
                    </p>
                </div>
                <div className="sm:text-base md:text-sm text-xs">
                    <ul className="flex gap-2 pl-2 md:pl-0 sm:gap-3 md:gap-4">
                        <li
                            onClick={() => {
                                handleCategoriesClick();
                                handleMenuItemClick("Categories");
                            }}
                            className={`relative cursor-pointer ${selectedItem === "Categories" ? "text-orange-400" : ""}`}
                        >
                            Categories
                            {isDropdownOpen && (
                                <ul className="absolute top-full rounded-lg left-0 mt-2 w-40 bg-white shadow-lg">
                                    {categories.map(category => (
                                        <li
                                            key={category}
                                            onClick={() => {
                                                handleCategorySelect(category);
                                                handleMenuItemClick(category);
                                            }}
                                            className={`py-2 px-4 hover:bg-gray-200 cursor-pointer hover:text-orange-600 `}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li
                            onClick={() => {handleMenuItemClick("Deals") , setIsDropdownOpen(false)  }}
                            className={`cursor-pointer ${selectedItem === "Deals" ? "text-orange-400" : ""}`}
                        >
                            Deals
                        </li>
                        <li
                            onClick={() => {handleMenuItemClick("WhatsNews"), setIsDropdownOpen(false)  }}
                            className={`cursor-pointer ${selectedItem === "WhatsNews" ? "text-orange-400" : ""}`}
                        >
                            WhatsNews
                        </li>
                        <li
                            onClick={() => {handleMenuItemClick("Delivery"), setIsDropdownOpen(false) }}
                            className={`cursor-pointer ${selectedItem === "Delivery" ? "text-orange-400" : ""}`}
                        >
                            Delivery
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center sm:flex-row md:flex-row md:gap-3 sm:text-base md:text-sm text-xs  md:pb-0 gap-y-2 md:gap-y-0 gap-1">
            <div
                onClick={toggleNav}
                className="cursor-pointer flex md:hidden items-center pr-5 gap-1 relative"
            >
                <FaRegUser />
                
                {isNavOpen && (
                    <div className="absolute top-full  right-1 mt-2 bg-white shadow-lg rounded-lg p-2 flex flex-col items-center">
                        <span
                            onClick={handleAccountClick}
                            className="cursor-pointer py-1 px-3 hover:bg-gray-200 rounded"
                        >
                           <span>{userName || 'Account'}</span>
                        </span>
                        <span
                            onClick={handleBasketClick}
                            className="cursor-pointer py-1 px-3 hover:bg-gray-200 rounded mt-2"
                        >
                            Card
                        </span>
                    </div>
                )}
            </div>
           
            <div className=" hidden sm:flex md:flex-row items-center gap-4">
                <span
                    onClick={handleAccountClick}
                    className="cursor-pointer"
                >
                    {userName || 'Account'}
                </span>
                <span
                    onClick={handleBasketClick}
                    className="cursor-pointer"
                >
                    Card
                </span>
            </div>
        </div>
            {isBasketOpen && <Basket closeBasket={closeBasket} />}
        </div>
    );
}


/* import React, { useState, useEffect } from "react";
import { BiSolidTShirt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import supabase from "../supaBase";
import Basket from "./Basket";
import { useNavigate } from "react-router-dom";

export default function Header({ onCategorySelect }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isBasketOpen, setIsBasketOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null); 
    const [userName, setUserName] = useState(null); 
    const [categories, setCategories] = useState(['all']);
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data, error } = await supabase.from('productsCategory').select('category');
            if (error) {
                console.error('Error fetching categories:', error.message);
            } else {
                setCategories(['all', ...new Set(data.map(item => item.category))]);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const savedItem = localStorage.getItem("selectedItem");
        if (savedItem && categories.includes(savedItem)) {
            setSelectedItem(savedItem);
            onCategorySelect(savedItem);
        }
    }, [categories]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            (async () => {
                const { data, error } = await supabase
                    .from('users')
                    .select('username')
                    .eq('token', token)
                    .single();
                
                if (error) {
                    console.error('Error:', error.message);
                    return;
                }

                if (data) {
                    setUserName(data.username);
                }
            })();
        }
    }, []);

    const handleCategoriesClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategorySelect = (category) => {
        onCategorySelect(category);
        setIsDropdownOpen(false);
        handleMenuItemClick(category);
    };

    const handleBasketClick = () => {
        setIsBasketOpen(!isBasketOpen);
    };

    const closeBasket = () => {
        setIsBasketOpen(false);
    };

    const handleAccountClick = () => {
        navigate("/login");
    };

    const handleMenuItemClick = (item) => {
        setSelectedItem(item);
        localStorage.setItem("selectedItem", item);
    };

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    };

    return (
        <div className="w-full flex items-center justify-between pr-2 bg-slate-200 h-20">
            <div className="flex md:px-3  px-0 items-center ">
                <div className=" gap-x-5 py-5 px-6 hidden md:flex items-center">
                    <BiSolidTShirt className="text-orange-400  md:w-8 md:h-8" />
                    <p className="text-orange-400 lg:text-2xl font-semibold text-xl">
                        Minimal <span className="text-2xl font-semibold text-red-500">shop</span>ping
                    </p>
                </div>
                <div className="sm:text-base md:text-sm text-xs">
                    <ul className="flex gap-2 pl-2 md:pl-0 sm:gap-3 md:gap-4">
                        <li
                            onClick={() => {
                                handleCategoriesClick();
                                handleMenuItemClick("Categories");
                            }}
                            className={`relative cursor-pointer ${selectedItem === "Categories" ? "text-orange-400" : ""}`}
                        >
                            Categories
                            {isDropdownOpen && (
                                <ul className="absolute top-full rounded-lg left-0 mt-2 w-40 bg-white shadow-lg">
                                    {categories.map(category => (
                                        <li
                                            key={category}
                                            onClick={() => {
                                                handleCategorySelect(category);
                                                handleMenuItemClick(category);
                                            }}
                                            className={`py-2 px-4 hover:bg-gray-200 cursor-pointer hover:text-orange-600 `}
                                        >
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                        <li
                            onClick={() => {handleMenuItemClick("Deals") , setIsDropdownOpen(false)  }}
                            className={`cursor-pointer ${selectedItem === "Deals" ? "text-orange-400" : ""}`}
                        >
                            Deals
                        </li>
                        <li
                            onClick={() => {handleMenuItemClick("WhatsNews"), setIsDropdownOpen(false)  }}
                            className={`cursor-pointer ${selectedItem === "WhatsNews" ? "text-orange-400" : ""}`}
                        >
                            WhatsNews
                        </li>
                        <li
                            onClick={() => {handleMenuItemClick("Delivery"), setIsDropdownOpen(false) }}
                            className={`cursor-pointer ${selectedItem === "Delivery" ? "text-orange-400" : ""}`}
                        >
                            Delivery
                        </li>
                    </ul>
                </div>
            </div>
            <div className="flex flex-col items-center sm:flex-row md:flex-row md:gap-3 sm:text-base md:text-sm text-xs  md:pb-0 gap-y-2 md:gap-y-0 gap-1">
            <div
                onClick={toggleNav}
                className="cursor-pointer flex md:hidden items-center pr-5 gap-1 relative"
            >
                <FaRegUser />
                
                {isNavOpen && (
                    <div className="absolute top-full  right-1 mt-2 bg-white shadow-lg rounded-lg p-2 flex flex-col items-center">
                        <span
                            onClick={handleAccountClick}
                            className="cursor-pointer py-1 px-3 hover:bg-gray-200 rounded"
                        >
                           <span>{userName || 'Account'}</span>
                        </span>
                        <span
                            onClick={handleBasketClick}
                            className="cursor-pointer py-1 px-3 hover:bg-gray-200 rounded mt-2"
                        >
                            Card
                        </span>
                    </div>
                )}
            </div>
           
            <div className=" hidden sm:flex md:flex-row items-center gap-4">
                <span
                    onClick={handleAccountClick}
                    className="cursor-pointer"
                >
                    {userName || 'Account'}
                </span>
                <span
                    onClick={handleBasketClick}
                    className="cursor-pointer"
                >
                    Card
                </span>
            </div>
        </div>
            {isBasketOpen && <Basket closeBasket={closeBasket} />}
        </div>
    );
}
 */