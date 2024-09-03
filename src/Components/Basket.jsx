import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import BasketItem from "./BasketItem";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { basketState } from "../redux/baketSlice";
import { GrDeliver } from "react-icons/gr";
import { MdOutlineSecurity } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import supabase from "../supaBase"; // Assuming this file correctly configures supabase

export default function Basket({ closeBasket }) {
  const { items } = useSelector(basketState);
  const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedAddress, setEditedAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: user, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return null;
      }

      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("token", token)
        .single();

      if (error) {
        throw new Error("Error fetching user: " + error.message);
      }

      return data;
    },
    onSuccess: (data) => {
      if (data) {
        setEditedName(data.username);
        setEditedAddress(data.adress);
      }
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async ({ username, adress }) => {
      const { error } = await supabase
        .from("users")
        .update({ username, adress })
        .eq("id", user.id);

      if (error) {
        throw new Error("Error updating user: " + error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      setIsEditing(false);
      setErrorMessage(""); // Clear error message on success
    },
    onError: (error) => {
      console.error(error.message);
      setErrorMessage("Network Error: Please try again later."); // Set error message
    },
  });

  const handleEditClick = () => {
    if (user) {
      setEditedName(user.username);
      setEditedAddress(user.adress);
    }
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    updateUserMutation.mutate({
      username: editedName,
      adress: editedAddress,
    });
  };

  return createPortal(
    <div className="flex justify-center items-center fixed z-20 top-0 left-0 w-full bg-black bg-opacity-50 h-screen">
      <div className="w-[300px] md:w-[800px] h-fit p-5 rounded-md bg-white">
        <div className="flex justify-end pb-2">
          <IoCloseCircleSharp
            className="w-6 h-6 text-gray-400 hover:text-gray-600 cursor-pointer"
            onClick={closeBasket}
          />
        </div>
        <div className="flex md:flex-row md:gap-x-3 flex-col gap-y-3">
          <div className="flex flex-col items-center">
            <div className="text-center border rounded-lg md:w-[450px] w-[255px] h-[100px] md:h-[200px] overflow-y-scroll border-gray-500">
              <h1 className="pl-4 font-medium text-lg text-left">
                Card Details
              </h1>
              {items.map((item) => (
                <BasketItem key={item.id} product={item} />
              ))}
            </div>

            <div className="border border-gray-500 rounded-lg mt-4 h-[100px] md:h-[170px] md:w-[450px] w-[255px] overflow-y-scroll text-left">
              <div className="flex justify-between px-3 py-3">
                <h2>Delivery Information</h2>
                {isEditing ? (
                  <button
                    onClick={handleSaveClick}
                    className="border border-yellow-600 px-3 py-1 rounded-3xl text-yellow-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={handleEditClick}
                    className="border border-yellow-600 px-3 py-1 rounded-3xl text-yellow-600"
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="p-3">
              {errorMessage && (
                  <p className="text-red-500 mt-2">{errorMessage}</p>
                )}
                <p>
                  {isEditing ? (
                    <input
                      className="bg-gray-200 p-2 rounded-md w-full"
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Username"
                    />
                  ) : (
                    `Name: ${user?.username || "Loading..."}`
                  )}
                </p>
                <p className="mt-3">
                  {isEditing ? (
                    <input
                      className="bg-gray-200 p-2 rounded-md w-full"
                      type="text"
                      value={editedAddress}
                      onChange={(e) => setEditedAddress(e.target.value)}
                      placeholder="Address"
                    />
                  ) : (
                    `Address: ${user?.adress || "Loading..."}`
                  )}
                </p>
                
              </div>
            </div>
          </div>

          <div className="border-gray-400 border rounded-md w-64 h-fit">
            <h2 className="p-2 font-semibold md:text-xl text-lg">
              Order summary
            </h2>
            <div className="p-1 md:p-2">
              <p>Products added</p>
              <span>{totalQuantity}</span>
            </div>
            <div className="p-1 md:p-2">
              <p>Total Cart Value</p>
              <span>{totalPrice}</span>
            </div>
            <div className="p-1 md:p-2">
              <p>GST</p>
              <p className="text-gray-500">1.25%</p>
            </div>
            <div className="p-1 md:p-2">
              <p>S-GST</p>
              <p className="text-gray-500">1.25%</p>
            </div>
            <div className="w-full h-28 bg-gray-200">
              <div className="flex items-center px-4 pt-2 gap-x-2 mb-4">
                <GrDeliver className="text-gray-500 w-5 h-5" />
                <div>
                  <p>Delivery limit</p>
                  <p className="text-gray-500 text-xs">
                    Free delivery within 50 kms
                  </p>
                </div>
              </div>

              <div className="flex items-center px-4 pt-2 gap-x-2 mb-4">
                <MdOutlineSecurity className="text-gray-500 w-5 h-5" />
                <div>
                  <p>Return Policy</p>
                  <p className="text-gray-500 text-xs">
                    Within 5 days of product delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}


