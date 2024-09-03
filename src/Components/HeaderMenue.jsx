import React, { useContext } from "react";
import { BiSolidTShirt } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { CategoriesContext } from "../Contexts/CategoriesContext";
import { RiLoginBoxLine, RiLogoutBoxRLine } from "react-icons/ri";

export default function HeaderMenue({
  isDropdownOpen,
  selectedItem,
  handleCategoriesClick,
  handleCategorySelect,
  handleMenuItemClick,
  isNavOpen,
  toggleNav,
  userName,
  handleAccountClick,
  handleLogoutClick,
  handleBasketClick,
}) {
  const { categories } = useContext(CategoriesContext);

  return (
    <div className="sm:text-base md:text-sm text-xs hidden lg:flex items-center gap-4">
      <BiSolidTShirt className="text-orange-400 md:w-8 md:h-8" />
      <p className="text-orange-400 lg:text-2xl font-semibold text-xl">
        Minimal{" "}
        <span className="text-2xl font-semibold text-red-500">shop</span>
        ping
      </p>
      <ul className="flex gap-2 md:pl-0 sm:gap-3 md:gap-4">
        <li
          onClick={() => {
            handleCategoriesClick();
            handleMenuItemClick("Categories");
          }}
          className={`relative cursor-pointer ${
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
            handleCategoriesClick();
          }}
          className={`cursor-pointer ${
            selectedItem === "Deals" ? "text-orange-400" : ""
          }`}
        >
          Deals
        </li>
        <li
          onClick={() => {
            handleMenuItemClick("WhatsNews");
            handleCategoriesClick();
          }}
          className={`cursor-pointer ${
            selectedItem === "WhatsNews" ? "text-orange-400" : ""
          }`}
        >
          WhatsNews
        </li>
        <li
          onClick={() => {
            handleMenuItemClick("Delivery");
            handleCategoriesClick();
          }}
          className={`cursor-pointer ${
            selectedItem === "Delivery" ? "text-orange-400" : ""
          }`}
        >
          Delivery
        </li>
      </ul>
    </div>
  );
}
