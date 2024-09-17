import React, { useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'
import axios from 'axios';
import addtocart from '../../assets/images/icon add-to-cart.png'
import { HashLoader } from 'react-spinners';
import ProductItem from '../ProductItem/ProductItem';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
export default function ProductDetails() {


  let { addProductToCart,cartItemsNum, setCartItemsNum } = useContext(CartContext)
  const settings = {

    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,

  }


  let { id, categoryId } = useParams()
  // console.log(id);
  let [productDetails, setProductDetails] = useState()
  let [relatedProducts, setRelatedProducts] = useState([])
  let [isLoading, setIsLoading] = useState(true)
  useEffect(() => { getProductDetails(), getRelatedProducts() }, [])
  useEffect(() => { getProductDetails() }, [id])


  async function addToCartItem(id) {
    setIsLoading(true)
    let data = await addProductToCart(id);
    console.log(data);
    if (data.status == 'success') {
      let newCartItemsNum =cartItemsNum+1;
      setCartItemsNum(newCartItemsNum)
      console.log("succ");
      toast.success(data.message, {
        duration: 5000
      })
    }
    else {
      console.log('error');

    }
    setIsLoading(false)
  }

  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data)
        setIsLoading(false);
        window.scrollTo(0, 0);
        if (relatedProducts.length) {
          getDataFiltered(relatedProducts)
        }
      })
      .catch(({ err }) => console.log(err));

  }


  function getRelatedProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        getDataFiltered(data.data)
      })
      .catch(({ err }) => console.log(err));

  }
  function getDataFiltered(data) {
    let res = data.filter(ele => ele.category._id == categoryId && ele._id != id);


    setRelatedProducts(res)


  }

  return (
    <>
      <div className="row items-center my-5">
        {isLoading ? <div className="flex justify-center w-full"><HashLoader color='#68d391' />
        </div> : <>
          <div className="lg:w-1/3 relative mx-auto w-3/4"><Slider {...settings}>
            {productDetails.images.map(src => <img key={src} src={src} className='w-3/4 cursor-grab' alt={productDetails.title} />)}</Slider>
            <div className="absolute top-1 left-3 flex justify-between items-start">
              {productDetails.priceAfterDiscount ?
                <div className="sale bg-red-500 text-white w-10 h-6 rounded flex justify-center items-center">
                  -{Math.round((productDetails.price - productDetails.priceAfterDiscount) / productDetails.price * 100)}%
                </div>
                : <div></div>}
            </div>
          </div>
          <div className="lg:w-2/3 mt-3 mx-auto">

            <div className="w-3/4 m-auto  text-start">
              <h2 className='font-light text-3xl mb-3'>{productDetails.title}    </h2>
              <p className='leading-5'> <span className='font-bold'>Description:</span> {productDetails.description}</p>
              <span className='block mb-2 text-green-500'> {productDetails.category.name}</span>
              <div className='flex justify-between mb-3 w-2/3 m-auto'>
                {productDetails.priceAfterDiscount ? (
                  <>
                    <span className='text-red-500 text-sm font-bold'>{productDetails.priceAfterDiscount} EGP</span>
                    <span className='line-through text-gray-500'>{productDetails.price} EGP</span>
                  </>
                ) : (
                  <span>{productDetails.price} EGP</span>
                )}
                <span><i className='fa-star fa-solid text-yellow-500'></i> {productDetails.ratingsAverage}</span>
              </div>
              <div className=' m-auto '>
                <button onClick={() => addToCartItem(productDetails?.id)} className='btn w-full px-5 py-2 hover:bg-green-600 flex flex-wrap justify-center items-center '>
                  <img src={addtocart} className='w-5 me-2' alt="" /> Add To Cart
                </button>
              </div></div>
          </div>
        </>}

      </div>


      <div>
        {!isLoading ? <h2 className='text-green-500 text-2xl '> Related Products</h2> : ''}
        <div className="row mx-auto pb-4 md:w-full w-11/12">
          {relatedProducts.map((product, i) => <ProductItem product={product} key={i} addCart={addToCartItem} />)}
        </div>
      </div>

    </>
  )
}
