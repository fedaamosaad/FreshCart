import React, { useEffect, useState } from "react";

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  let [apiError,setApiError]=useState(null)
  let [isLoading,setIsLoading]=useState(false)
  let navigate = useNavigate()
  function register(formValue) {
    setApiError(null)
    setIsLoading(true)
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", formValue)
      .then((res) => 
      {
        let {data}=res;
        if (data.message =="success"){
navigate("/login")
        }   
      })
      .catch((err) => {setApiError(err.response.data.message)
        setIsLoading(false)
      });
  }

  const validationSchema = () => {
    return Yup.object({
      name: Yup.string()
        .min(2, "Name is too short! It should be at least 2 characters.")
        .max(30, "Name is too long! It should be at most 30 characters.")
        .required("Name is required."),
      
      email: Yup.string()
        .email("Invalid email format.")
        .required("Email is required."),
      
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number (e.g., 01012345678).")
        .required("Phone number is required."),
      
      password: Yup.string()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
          "Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, and one digit."
        )
        .required("Password is required."),
      
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Re-entered password must match the password.")
        .required("Re-entering the password is required."),
    });
  };

  let myForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: register,
  });

  return (
    <>
    {apiError&& <div
            className="max-w-sm mx-auto p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{apiError}</span>
          </div>}
      <form onSubmit={myForm.handleSubmit} className="max-w-sm pt-10 mx-auto">
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="name"
            value={myForm.values.name}
            onChange={myForm.handleChange}
            onBlur={myForm.handleBlur}
          />
        </div>
        {myForm.errors.name && myForm.touched.name ? (
          <div
            className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.name}</span>
          </div>
        ) : null}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>

          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@flowbite.com"
            value={myForm.values.email}
            onChange={myForm.handleChange}
            onBlur={myForm.handleBlur}
          />
        </div>
        {myForm.errors.email && myForm.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.email}</span>
          </div>
        ) : null}
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="password"
            value={myForm.values.password}
            onChange={myForm.handleChange}
            onBlur={myForm.handleBlur}
          />
        </div>
        {myForm.errors.password && myForm.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.password}</span>
          </div>
        ) : null}
        <div className="mb-5">
          <label
            htmlFor="rePassword"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            renter ur password
          </label>
          <input
            type="password"
            id="rePassword"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="repassword"
            value={myForm.values.rePassword}
            onChange={myForm.handleChange}
            onBlur={myForm.handleBlur}
          />
        </div>
        {myForm.errors.rePassword && myForm.touched.rePassword ? (
          <div
            className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.rePassword}</span>
          </div>
        ) : null}
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            type="tel"
            id="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="phone"
            value={myForm.values.phone}
            onChange={myForm.handleChange}
            onBlur={myForm.handleBlur}
          />
        </div>
        {myForm.errors.phone && myForm.touched.phone ? (
          <div
            className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.phone}</span>
          </div>
        ) : null}
        <button
        disabled={isLoading}
          type="submit"
          className="text-white btn  focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
         {isLoading?<i className="fa fa-spinner fa-spin"></i> :"Submit" }
          
        </button>

      </form>
      <div className="flex items-center justify-center pt-6"><div className="w-28 h-0.5 bg-gray-300"></div><p className="text-lg px-4 text-gray-500">or</p><div className="w-28 h-0.5 bg-gray-300"></div></div>
      <p className='text-center'>already have account? <Link className='text-underline text-green-700' to={'/login'}>Login</Link></p>
    </>
  );
}
