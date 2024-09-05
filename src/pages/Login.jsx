
/* import React, { useEffect, useState } from 'react';
import { IoMdKey } from 'react-icons/io';
import { BiUserPlus } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import supabase from "../supaBase"; // فرض بر این است که این فایل supabaseClient.js شما را تنظیم کرده است
import { useFormik } from 'formik';

export default function Login() {
  const [users, setUsers] = useState([]);
  const [showError, setShowError] = useState(false); // state برای نمایش مودال
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('users').select('*');
      if (error) {
        console.error('Error fetching users:', error.message);
        return;
      }
      console.log('Users data:', data); // بررسی داده‌های دریافتی
      setUsers(data);
    })();
  }, []);

  const handleLogin = (values) => {
    console.log('Username:', values.username);
    console.log('Password:', values.password);

    const user = users.find(user => user.username === values.username && user.password === values.password);

    if (user) {
      console.log('User found:', 'کاربر وارد شد'); // چاپ پیغام موفقیت
      // ذخیره توکن کاربر در لوکال استوریج
      localStorage.setItem('token', user.token);
      // در صورت وجود کاربر معتبر، به صفحه خانه هدایت شوید
      navigate('/home');
    } else {
      console.error('Invalid username or password');
      setShowError(true); // نمایش مودال خطا
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validate: (values) => {
      let errors = {};

      if (values.username === "") {
        errors.username = "the username field is required";
      }

      if (values.password === "") {
        errors.password = "the password field is required";
      }

      return errors;
    },

    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <form
  className="flex items-center flex-col justify-center min-h-screen bg-slate-200 p-4"
  onSubmit={formik.handleSubmit}
>
  <p className="text-orange-400 py-2 font-semibold text-2xl text-center">
    Minimal{" "}
    <span className="text-2xl font-semibold text-red-500">shopping</span>
  </p>
  <div className="w-full sm:w-[75%] md:w-[50%] lg:w-[30%] bg-white rounded-lg h-fit p-5">
    <div className="flex justify-center gap-x-4 pt-6">
      <Link
        to="/login"
        className="flex items-center gap-x-1 justify-center w-24 h-10 bg-orange-400 rounded-lg"
      >
        <p className="text-white font-normal">Sign In</p>
        <IoMdKey className="text-white w-5 h-5" />
      </Link>
      <Link
        to="/signup"
        className="flex items-center gap-x-1 justify-center w-24 h-10 bg-orange-400 rounded-lg"
      >
        <p className="text-white font-normal">Sign Up</p>
        <BiUserPlus className="text-white w-5 h-5" />
      </Link>
    </div>

    <div className="flex flex-col py-5 px-5">
      <label className="text-lg font-medium">Username</label>
      <input
        className="bg-blue-100 p-3 rounded-md"
        type="text"
        name="username"
        {...formik.getFieldProps("username")}
      />
      {formik.touched.username && formik.errors.username ? (
        <span className="text-red-500 text-sm">{formik.errors.username}</span>
      ) : null}
    </div>
    <div className="flex flex-col py-5 px-5">
      <label className="text-lg font-medium">Password</label>
      <input
        className="bg-blue-100 p-3 rounded-md"
        type="password"
        name="password"
        {...formik.getFieldProps("password")}
      />
      {formik.touched.password && formik.errors.password ? (
        <span className="text-red-500 text-sm">{formik.errors.password}</span>
      ) : null}
    </div>
    {showError && (
      <p className="text-red-500 font-semibold text-center">User not found</p>
    )}
    <div className="p-5">
      <button
        type="submit"
        className="bg-orange-400 w-full p-3 rounded-lg text-white"
      >
        Login
      </button>
    </div>
  </div>
</form>

   
  );
}
 */
import React, { useState } from 'react';
import { IoMdKey } from 'react-icons/io';
import { BiUserPlus } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import supabase from "../supaBase"; // فرض بر این است که این فایل supabaseClient.js شما را تنظیم کرده است
import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';

// تابعی برای دریافت کاربران
const fetchUsers = async () => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function Login() {
  const [showError, setShowError] = useState(false); // state برای نمایش مودال
  const navigate = useNavigate();
  
  // استفاده از useQuery با شیء
  const { data: users = [], error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    onError: (err) => {
      console.error('Error fetching users:', err.message);
    },
  });

  const handleLogin = (values) => {
    console.log('Username:', values.username);
    console.log('Password:', values.password);

    const user = users.find(user => user.username === values.username && user.password === values.password);

    if (user) {
      console.log('User found:', 'کاربر وارد شد'); // چاپ پیغام موفقیت
      // ذخیره توکن کاربر در لوکال استوریج
      localStorage.setItem('token', user.token);
      // در صورت وجود کاربر معتبر، به صفحه خانه هدایت شوید
      navigate('/');
    } else {
      console.error('Invalid username or password');
      setShowError(true); // نمایش مودال خطا
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validate: (values) => {
      let errors = {};

      if (values.username === "") {
        errors.username = "the username field is required";
      }

      if (values.password === "") {
        errors.password = "the password field is required";
      }

      return errors;
    },

    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  return (
    <form
      className="flex items-center flex-col justify-center min-h-screen bg-slate-200 p-4"
      onSubmit={formik.handleSubmit}
    >
      <p className="text-orange-400 py-2 font-semibold text-2xl text-center">
        Minimal{" "}
        <span className="text-2xl font-semibold text-red-500">shopping</span>
      </p>
      <div className="w-full sm:w-[75%] md:w-[50%] lg:w-[30%] bg-white rounded-lg h-fit p-5">
        <div className="flex justify-center gap-x-4 pt-6">
          <Link
            to="/login"
            className="flex items-center gap-x-1 justify-center w-24 h-10 bg-orange-400 rounded-lg"
          >
            <p className="text-white font-normal">Sign In</p>
            <IoMdKey className="text-white w-5 h-5" />
          </Link>
          <Link
            to="/signup"
            className="flex items-center gap-x-1 justify-center w-24 h-10 bg-orange-400 hover:bg-orange-300 rounded-lg"
          >
            <p className="text-white font-normal">Sign Up</p>
            <BiUserPlus className="text-white w-5 h-5" />
          </Link>
        </div>

        <div className="flex flex-col py-5 px-5">
          <label className="text-lg font-medium">Username</label>
          <input
            className="bg-blue-100 p-3 rounded-md"
            type="text"
            name="username"
            {...formik.getFieldProps("username")}
          />
          {formik.touched.username && formik.errors.username ? (
            <span className="text-red-500 text-sm">{formik.errors.username}</span>
          ) : null}
        </div>
        <div className="flex flex-col py-5 px-5">
          <label className="text-lg font-medium">Password</label>
          <input
            className="bg-blue-100 p-3 rounded-md"
            type="password"
            name="password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <span className="text-red-500 text-sm">{formik.errors.password}</span>
          ) : null}
        </div>
        {showError && (
          <p className="text-red-500 font-semibold text-center">User not found</p>
        )}
        <div className="p-5">
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-300 w-full p-3 rounded-lg text-white"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}



