import React, { useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import addtocart from '../../assets/images/icon add-to-cart.png'
import { HashLoader } from 'react-spinners';
import ProductItem from '../ProductItem/ProductItem';
import Slider from 'react-slick';
import { useQuery } from '@tanstack/react-query'
export default function ProductDetails() {



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




  function getProductDetails() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data)
        setIsLoading(false);
        if (relatedProducts.length) {
          getDataFiltered(relatedProducts)
        }
      })
      .catch(({ err }) => console.log(err));

  }
  // function getProductDetails() {
  //   return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      

  // }
  // let{data2} =useQuery({
  //   queryKey: ['details'],
  //   queryFn:getProductDetails()
  // })
  // console.log(data2);
  
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
    // console.log(res);

  }

  return (
    <>
      <div className="row items-center">
        {isLoading ? <div className="flex justify-center w-full"><HashLoader color='#68d391' />
        </div> : <>
          <div className="w-1/3"><Slider {...settings}>
            {productDetails.images.map(src => <img key={src} src={src} className='w-full cursor-grab' alt={productDetails.title} />)}
           </Slider>
          </div>
          <div className="w-2/3">
            <div className="w-3/4 m-auto text-start">
              <h2 className='font-light text-3xl mb-3'>{productDetails.title}    </h2>
              <p className='leading-5'> <span className='font-bold'>Description:</span> {productDetails.description}</p>
              <span className='block mb-2 text-green-500'> {productDetails.category.name}</span>
              <div className='flex justify-between mb-3 w-2/3 m-auto'>
                <span>{productDetails.price} EGP </span>
                <span><i className='fa-star fa-solid text-yellow-500'></i> {productDetails.ratingsAverage}</span>
              </div>
              <div className=' m-auto '>
                <button className='btn hover:bg-green-600 flex flex-wrap justify-center items-center '>
                  <img src={addtocart} className='w-5 me-2' alt="" /> Add To Cart
                </button>
              </div></div>
          </div>
        </>}

      </div>


      <div>
        {!isLoading ? <h2 className='text-green-500 text-2xl '> Related Products</h2> : ''}
        <div className="row">
          {relatedProducts.map((product,i) => <ProductItem product={product} key={i}/>)}
        </div>
      </div>

    </>
  )
}
