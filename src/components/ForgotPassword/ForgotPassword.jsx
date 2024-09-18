import React, { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  let [apiError, setApiError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  let [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();
  function handleForgotPassword(formValue) {
    setApiError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", formValue)
      .then(({ data }) => {
        if (data.statusMsg === "success") {
          toast.success("Password reset link sent to your email!");
          setIsLoading(false);
          setTimeout(() => {
            navigate('/resetpassword');  
          }, 500);
        }
      
       
      })
      .catch((err) => {
        setApiError(err.response?.data?.message || "Something went wrong.");
        toast.error('Failed to send reset code. Try again.');
        setIsLoading(false);
      });
  }

  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
    });
  };

  let myForm = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgotPassword,
  });

  return (
    <>
      {apiError && (
        <div
          className="max-w-sm mx-auto p-4 mt-5 text-sm text-red-50 rounded-lg bg-red-500"
          role="alert"
        >
          <span className="font-medium">{apiError}</span>
        </div>
      )}
      {successMessage && (
        <div
          className="max-w-sm mx-auto p-4 mt-5 text-sm text-green-50 rounded-lg bg-green-500"
          role="alert"
        >
          <span className="font-medium">{successMessage}</span>
        </div>
      )}
      <form onSubmit={myForm.handleSubmit} className="max-w-sm mt-10 mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Enter your email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="name@flowbite.com"
            value={myForm.values.email}
            onChange={myForm.handleChange}
            onBlur={myForm.handleBlur}
          />
        </div>
        {myForm.errors.email && myForm.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500"
            role="alert"
          >
            <span className="font-medium">{myForm.errors.email}</span>
          </div>
        ) : null}
        <button
          disabled={isLoading}
          type="submit"
          className="text-white btn font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Reset Password"}
        </button>
        <p className="text-center">
          <Link className="my-3" to="/login">Back to login</Link>
        </p>
      </form>
    </>
  );
}