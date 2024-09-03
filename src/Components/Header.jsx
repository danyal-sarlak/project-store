
import React, { useState, useContext, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { CategoriesContext } from "../Contexts/CategoriesContext";
import Basket from "./Basket";
import { useNavigate } from "react-router-dom";
import supabase from "../supaBase"; // فرض بر این است که supabaseClient را درست تنظیم کرده‌اید
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";
import HeaderMenue from "./HeaderMenue";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userName, setUserName] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // برای منو
  const [isNavOpen, setIsNavOpen] = useState(false); // برای Account

  const navigate = useNavigate();
  const { categories, filterProductsByCategory } = useContext(CategoriesContext);

  useEffect(() => {
    const savedCategory = localStorage.getItem("selectedCategory") || "all";
    if (categories.includes(savedCategory)) {
      filterProductsByCategory(savedCategory);
      setSelectedItem(savedCategory);
    }
  }, [categories]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      (async () => {
        const { data, error } = await supabase
          .from("users")
          .select("username")
          .eq("token", token)
          .single();

        if (error) {
          console.error("Error:", error.message);
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
    localStorage.setItem("selectedCategory", category); // ذخیره دسته‌بندی انتخاب‌شده
    filterProductsByCategory(category);
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

  const handleLogoutClick = () => {
    setUserName(null);
    localStorage.removeItem("token");
    toggleNav();
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    localStorage.setItem("selectedItem", item);
  };

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflowY = isMenuOpen ? "auto" : "hidden";
  };

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "auto"; // فعال کردن اسکرول هنگام unmount شدن کامپوننت
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-between pr-2 bg-slate-200 h-20 relative">
      <HeaderMenue
        isDropdownOpen={isDropdownOpen}
        selectedItem={selectedItem}
        handleCategoriesClick={handleCategoriesClick}
        handleCategorySelect={handleCategorySelect}
        handleMenuItemClick={handleMenuItemClick}
        isNavOpen={isNavOpen}
        toggleNav={toggleNav}
        userName={userName}
        handleAccountClick={handleAccountClick}
        handleLogoutClick={handleLogoutClick}
        handleBasketClick={handleBasketClick}
      />
      
      {/* نوار حساب کاربری و سبد خرید برای سایز بزرگ */}
      <div className="cursor-pointer lg:flex hidden items-center gap-1 relative ml-auto">
        <div
          className="flex items-center gap-1 px-4 py-3 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-gray-300"
          onClick={toggleNav} // نوار Account با toggleNav باز و بسته می‌شود
        >
          <FaRegUser />
          <span>{userName || "Account"}</span>
        </div>
        {isNavOpen && (
          <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-2 flex flex-col items-center z-50">
            <span
              onClick={handleAccountClick}
              className="cursor-pointer py-1 px-3 hover:bg-gray-200 rounded"
            >
              <span className="flex items-center gap-1">
                Login
                <RiLoginBoxLine />
              </span>
            </span>
            <span
              onClick={handleLogoutClick}
              className="cursor-pointer py-1 px-3 hover:bg-gray-200 rounded"
            >
              <span className="flex items-center gap-1">
                Log out
                <RiLogoutBoxRLine />
              </span>
            </span>
          </div>
        )}
        <span
          onClick={handleBasketClick}
          className="cursor-pointer py-1 px-3 hover:bg-gray-200 rounded"
        >
          Card
        </span>
      </div>

      {/* منو موبایل */}
      <div className="lg:hidden pl-3 flex items-center relative">
        <FaBars onClick={toggleMenu} className="cursor-pointer text-2xl" />
        <div
          className={`fixed top-0 left-0 h-full bg-slate-100 shadow-lg transition-transform transform ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } w-1/2 z-50`}
        >
          <div className="flex flex-col items-start py-4 pl-4">
            <FaBars
              onClick={() => {
                toggleMenu();
                setIsDropdownOpen(false);
              }}
              className="cursor-pointer text-2xl mb-4"
            />
            <ul className="flex flex-col w-full">
              <li
                onClick={() => {
                  handleCategoriesClick();
                  handleMenuItemClick("Categories");
                }}
                className={`relative py-3 px-4 w-full cursor-pointer ${
                  selectedItem === "Categories" ? "text-orange-400" : ""
                }`}
              >
                Categories
                {isDropdownOpen && (
                  <ul className="absolute top-full rounded-lg left-0 mt-2 w-40 bg-white shadow-lg">
                    {categories.map((category) => (
                      <li
                        key={category}
                        onClick={() => {
                          handleCategorySelect(category);
                          handleMenuItemClick(category);
                        }}
                        className="py-2 px-4 hover:bg-gray-200 cursor-pointer hover:text-orange-600"
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick("Deals");
                  setIsDropdownOpen(false);
                }}
                className={`py-3 px-4 w-full cursor-pointer ${
                  selectedItem === "Deals" ? "text-orange-400" : ""
                }`}
              >
                Deals
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick("WhatsNews");
                  setIsDropdownOpen(false);
                }}
                className={`py-3 px-4 w-full cursor-pointer ${
                  selectedItem === "WhatsNews" ? "text-orange-400" : ""
                }`}
              >
                WhatsNews
              </li>
              <li
                onClick={() => {
                  handleMenuItemClick("Delivery");
                  setIsDropdownOpen(false);
                }}
                className={`py-3 px-4 w-full cursor-pointer ${
                  selectedItem === "Delivery" ? "text-orange-400" : ""
                }`}
              >
                Delivery
              </li>
              <li
                className="py-3 px-4 w-full cursor-pointer hover:bg-gray-500 "
                onClick={handleAccountClick}
              >
                <span className="flex items-center gap-1">
                  Login
                  <RiLoginBoxLine />
                </span>
              </li>
              <li
                className="py-3 px-4 w-full cursor-pointer hover:bg-gray-500 rounded"
                onClick={() => {
                  handleLogoutClick();
                  toggleMenu();
                }}
              >
                <span className="flex items-center gap-1">
                  Log out
                  <RiLogoutBoxRLine />
                </span>
              </li>
              <li
                onClick={() => {
                  handleBasketClick();
                  toggleMenu();
                }}
                className="py-3 px-4 w-full cursor-pointer"
              >
                Card
              </li>
            </ul>
          </div>
        </div>
      </div>

      {isBasketOpen && <Basket closeBasket={closeBasket} />}
    </div>
  );
}
