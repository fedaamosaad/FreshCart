import React, { useContext, useEffect, useState } from 'react'
import styles from './CheckOut.module.css'
import { useFormik } from 'formik';
import * as Yup from "yup";
import {
  CitySelect,
  CountrySelect,
  StateSelect
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import { CartContext } from '../../Context/CartContext';
import { useNavigate, useParams } from 'react-router-dom';

export default function CheckOut() {
  let { cartId } = useParams();
  const { cashOnDelivery } = useContext(CartContext);
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [payOnDelivery, setPayOnDelivery] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();

  // Payment submission logic
  async function pay(values) {
    let url = `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`;
    if (payOnDelivery) { url = `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`}
    
    let res = await cashOnDelivery(url, values);
    if (res.status === 'success') {
      console.log(values);
      if (onlinePayment) {
        window.location.href = res.session.url;
      } else {
        navigate('/allorders')
      }

    } else {
      console.log(res);
    }
  }

  // Form validation schema
  const validationSchema = () => {
    return Yup.object({
      details: Yup.string()
        .matches(/^[a-zA-Z][a-zA-Z0-9\s,.'-]{5,}$/, 'Must be at least 6 characters and start with a letter')
        .required("Required"),
      city: Yup.string()
        .matches(/^[a-zA-Z][a-zA-Z\s'-]{2,}$/, 'City must be at least 3 characters and start with a letter')
        .required("City is required"),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "Phone number must start with 01 followed by 9 digits.")
        .required("Phone number is required"),
    });
  };

  // Handle form submission with payment method validation
  const handleSubmit = (e) => {
    myForm.handleSubmit(e);
    if (!payOnDelivery && !onlinePayment) {
      e.preventDefault();
      setErrorMessage('Please select either Pay on Delivery or Online Payment.');
    } else {
      setErrorMessage('');

    }
  };

  // Initialize Formik
  let myForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
      country: "",
      quarter: ""
    },
    validationSchema,
    onSubmit: pay,
  });

  return (
    <>
      <h1 className="font-bold text-4xl mt-5 text-center">CheckOut</h1>
      <form onSubmit={handleSubmit}>
        <div className="container md:w-1/2 w-10/12 mx-auto ">

          {/* Country selection */}
          <div className="mb-5">
            <label
              htmlFor="country"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your country
            </label>
            <CountrySelect
              type="text"
              id="country"
              onChange={(item) => {
                setCountryid(item.id);
                myForm.setFieldValue('country', item.name);
              }}
              placeHolder="Select Country"
            />
          </div>

          {/* City selection */}
          <div className="mb-5">
            <label
              htmlFor="city"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your city
            </label>
            <StateSelect

              countryid={countryid}
              onChange={(item) => {
                setStateid(item.id);
                myForm.setFieldValue('city', item.name);
              }}
              placeHolder="Select city"
            />
          </div>
          {myForm.errors.city && myForm.touched.city ? (
            <div className="p-4 mb-4 mt-2 text-sm text-red-50 rounded-lg bg-red-500">
              <span className="font-medium">{myForm.errors.city}</span>
            </div>
          ) : null}
          {/* Quarter selection */}
          <div className="mb-5">
            <label
              htmlFor="quarter"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your neighborhood
            </label>
            <CitySelect
              countryid={countryid}
              stateid={stateid}
              onChange={(item) => {
                myForm.setFieldValue('quarter', item.name);
              }}
              placeHolder="Select quarter"
            />
          </div>

          {/* Address details */}
          <div className="mb-5">
            <label
              htmlFor="details"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your Address details
            </label>
            <input
              type="text"
              id="details"
              name="details"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="details"
              value={myForm.values.details}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
            />
            {myForm.errors.details && myForm.touched.details ? (
              <div className="p-4 mb-4 mt-2 text-sm text-red-50 rounded-lg bg-red-500">
                <span className="font-medium">{myForm.errors.details}</span>
              </div>
            ) : null}
          </div>
          {/* Phone number */}
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="phone"
              value={myForm.values.phone}
              onChange={myForm.handleChange}
              onBlur={myForm.handleBlur}
            />
            {myForm.errors.phone && myForm.touched.phone ? (
              <div className="p-4 mb-4 mt-2 text-sm text-red-50 rounded-lg bg-red-500">
                <span className="font-medium">{myForm.errors.phone}</span>
              </div>
            ) : null}
          </div>
          {/* Payment Method */}
          <span>Payment Method:</span>
          <div className='flex w-10/12'>
            <div className='mx-2'><input
              className="h-5 w-5 me-1 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
              type="checkbox"
              id="payOnDelivery"
              checked={payOnDelivery}
              onChange={() => {
                setPayOnDelivery(true);
                setOnlinePayment(false);
                setErrorMessage('');
              }}
            />
              <label htmlFor="payOnDelivery">Pay on Delivery</label>
            </div>
            <div className='mx-2' >
              <input
                className="h-5 w-5 me-1 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                type="checkbox"
                id="onlinePayment"
                checked={onlinePayment}
                onChange={() => {
                  setOnlinePayment(true);
                  setPayOnDelivery(false);
                  setErrorMessage('');
                }}
              />
              <label htmlFor="onlinePayment">Online Payment</label>
            </div>
            {errorMessage && (
              <p style={{ color: 'red' }}>{errorMessage}</p>
            )}
          </div>
          <div className='flex justify-center'><button
            type="submit"
            className="text-white btn mt-3 w-full sm:w-auto px-5 py-2.5 "
          >
            {payOnDelivery ? 'Go To COD Payment' : 'Go To Online Payment'}
          </button></div>
        </div>
      </form>
    </>
  );
}