
  import React, { useState } from "react";
  import { IoMdKey } from "react-icons/io";
  import { BiUserPlus } from "react-icons/bi";
  import { Link } from "react-router-dom";
  import supabase from "../supaBase";
  import { useFormik } from "formik";
  import SignupModal from "../Components/SignupModal";
  import { useMutation } from "@tanstack/react-query";
  
  // تابعی برای ثبت نام کاربر
  const signUpUser = async (newUser) => {
    const { data, error } = await supabase.from("users").insert([newUser]);
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data;
  };
  
  export default function SignUp() {
    const [showModal, setShowModal] = useState(false);
  
    const mutation = useMutation({
      mutationFn: signUpUser,
      onSuccess: (data) => {
        console.log("User added:", data);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
        }, 2000);
      },
      onError: (error) => {
        console.error("Error:", error.message);
        setShowModal(false);
      },
    });
  
    const formik = useFormik({
      initialValues: {
        email: "", // اضافه کردن فیلد ایمیل برای انطباق با validate
        username: "",
        password: "",
        adress: "", // استفاده از نام فیلد درست
      },
  
      validate: (values) => {
        let errors = {};
  
        if (values.email === "") {
          errors.email = "the email field is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "the email field must be email format";
        }
  
        if (values.username === "") {
          errors.username = "the username field is required";
        }
  
        if (values.password === "") {
          errors.password = "the password field is required";
        }
  
        if (values.adress === "") {
          errors.adress = "the address field is required";
        }
  
        return errors;
      },
  
      onSubmit: (values) => {
        const newUser = {
          username: values.username,
          password: values.password,
          adress: values.adress, // ارسال فیلد به درستی
        };
  
        mutation.mutate(newUser); // استفاده از mutation برای ارسال داده‌ها
      },
    });
  
    return (
      <form
        className="flex items-center flex-col justify-center h-screen bg-slate-200 p-3"
        onSubmit={formik.handleSubmit}
      >
        {showModal && <SignupModal />}
        <p className="text-orange-400 py-2 font-semibold text-2xl">
          Minimal{" "}
          <span className="text-2xl font-semibold text-red-500">shop</span>
          ping
        </p>
        <div className="w-full max-w-md bg-white rounded-lg h-fit p-5">
          <div className="flex justify-center gap-x-4 pt-6">
            <Link
              to="/login"
              className="flex items-center gap-x-1 justify-center w-20 h-10 hover:bg-orange-300 bg-orange-400 rounded-lg"
            >
              <p className="text-white font-normal">sign in</p>
              <IoMdKey className="text-white w-5 h-5" />
            </Link>
            <Link
              to="/signup"
              className="flex items-center gap-x-1 justify-center w-20 h-10 hover:bg-orange-300 bg-orange-400 rounded-lg"
            >
              <p className="text-white font-normal">sign up</p>
              <BiUserPlus className="text-white w-5 h-5" />
            </Link>
          </div>
          <div className="flex flex-col py-1">
            <label className="text-lg font-medium">Email</label>
            <input
              className="bg-blue-100 p-3 rounded-md"
              type="text"
              name="email"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <span>{formik.errors.email}</span>
            ) : null}
          </div>
          <div className="flex flex-col py-5">
            <label className="text-lg font-medium">UserName</label>
            <input
              className="bg-blue-100 p-3 rounded-md"
              type="text"
              name="username"
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <span>{formik.errors.username}</span>
            ) : null}
          </div>
          <div className="flex flex-col py-5">
            <label className="text-lg font-medium">Password</label>
            <input
              className="bg-blue-100 p-3 rounded-md"
              type="password"
              name="password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <span>{formik.errors.password}</span>
            ) : null}
          </div>
          <div className="flex flex-col py-5">
            <label className="text-lg font-medium">Address</label>
            <input
              className="bg-blue-100 p-3 rounded-md"
              type="text"
              name="adress" // استفاده از نام درست فیلد
              {...formik.getFieldProps("adress")}
            />
            {formik.touched.adress && formik.errors.adress ? (
              <span>{formik.errors.adress}</span>
            ) : null}
          </div>
          <div className="p-5">
            <button
              className="bg-orange-400 hover:bg-orange-300 w-full p-3 rounded-lg text-white"
              type="submit"
              disabled={mutation.isLoading} // غیرفعال کردن دکمه در هنگام بارگذاری
            >
              {mutation.isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </div>
      </form>
    );
  }
  


///////////////////////////
