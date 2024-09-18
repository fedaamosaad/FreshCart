import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const navigate = useNavigate();

  
  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .required('Reset code is required')
      .min(4, 'Reset code must be at least 4 characters long'),
    newPassword: Yup.string()
      .when('isCodeVerified', {
        is: true,
        then: Yup.string()
          .required('New password is required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,20}$/,
            'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, and one digit.'
          ),
        otherwise: Yup.string().notRequired()
      }),
  });
  const formik = useFormik({
    initialValues: {
      resetCode: '',
      newPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setApiError(null);
      setIsLoading(true);
  
      try {
        if (!isCodeVerified) {
          
          const verifyResponse = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
            resetCode: values.resetCode,
          });
  
          if (verifyResponse.data.status === 'Success') {
            setIsCodeVerified(true); 
            setIsLoading(false);
            toast.success('Code verified! Please enter your new password.');
          }
        } else {
         
          const resetResponse = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
            resetCode: values.resetCode,
            newPassword: values.newPassword,
          });
  
          if (resetResponse.data.message === 'success') {
            setIsLoading(false);
            toast.success('Password reset successfully!');
            navigate('/login');
          }
        }
      } catch (error) {
        setApiError(error.response?.data?.message || 'Something went wrong!');
        toast.error('Invalid code. Please try again.');
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      {apiError && (
        <div
          className="max-w-sm mx-auto p-4 mt-5 text-sm text-red-50 rounded-lg bg-red-500 "
          role="alert"
        >
          <span className="font-medium ">{apiError}</span>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} className="max-w-sm mt-10 mx-auto">
        {/* Reset Code Input */}
        <div className="mb-5">
          <label
            htmlFor="resetCode"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Enter your reset code
          </label>
          <input
            type="text"
            id="resetCode"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            placeholder="Enter the reset code"
            value={formik.values.resetCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={isCodeVerified} 
          />
          {formik.errors.resetCode && formik.touched.resetCode && (
            <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500">
              <span className="font-medium">{formik.errors.resetCode}</span>
            </div>
          )}
        </div>

       
        {isCodeVerified && (
          <div className="mb-5">
            <label
              htmlFor="newPassword"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Enter new password
            </label>
            <input
              type="password"
              id="newPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              placeholder="New password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <div className="p-4 mb-4 text-sm text-red-50 rounded-lg bg-red-500">
                <span className="font-medium">{formik.errors.newPassword}</span>
              </div>
            )}
          </div>
        )}

        <button
          disabled={isLoading}
          type="submit"
          className="text-white btn font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          {isLoading ? <i className="fa fa-spinner fa-spin"></i> : isCodeVerified ? 'Reset Password' : 'Verify Code'}
        </button>
      </form>
    </>
  );
}