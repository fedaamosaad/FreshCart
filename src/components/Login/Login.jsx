import React, {  useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useContext } from "react";
import { UserTokenContext } from "../../Context/UserTokenContext";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let {setToken,convertToken} = useContext(UserTokenContext);

  let navigate = useNavigate();
  function login(formValue) {
    setApiError(null);
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", formValue)
      .then(({data}) => {
        // console.log(res);

       
        if (data.message == "success") {
          setIsLoading(false)
          
          localStorage.setItem("token", data.token);
          setToken(data.token);
          convertToken()
          navigate("/home");
         
        }
      })
      .catch((err) => {
        setApiError(err.response.data.message);

        setIsLoading(false);
      });
  }

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .matches(/^[A-z][a-z]{6,15}$/)
        .required("Required"),
    });
  };

  let myForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: login,
  });

  return (
    <>
      {apiError && (
        <div
          className="max-w-sm mx-auto p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{apiError}</span>
        </div>
      )}
      <form onSubmit={myForm.handleSubmit} className="max-w-sm pt-10 mx-auto">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

        <button
          disabled={isLoading}
          type="submit"
          className="text-white btn font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Login"}
        </button>
        <p className='text-center'> <Link className=' my-3' to='/forget'> forgot password? </Link></p>
       
      </form>
      <div className="flex items-center justify-center pt-6"><div className="w-28 h-0.5 bg-gray-300"></div><p className="text-lg px-4 text-gray-500">or</p><div className="w-28 h-0.5 bg-gray-300"></div></div>

      <p className='text-center'>dont have account? <Link className='text-underline text-green-700' to={'/register'}>Register</Link></p>
       
    </>
  );
}
