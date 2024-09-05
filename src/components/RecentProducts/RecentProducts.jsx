import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItem from '../ProductItem/ProductItem'
import { useQuery } from '@tanstack/react-query'
import { HashLoader } from 'react-spinners'
import { CartContext } from '../../Context/CartContext'


export default function RecentProducts() {


  let { addProductToCart } = useContext(CartContext)


  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products?page=1')
  }

  let { isLoading, data, isError } = useQuery({
    queryKey: ['Products'],
    queryFn: getProducts,
    staleTime: 10000,

  })
  console.log('data=>', data);
  console.log('isLoading=>', isLoading);

  function addToCartItem(id) {
    let bl7 = addProductToCart(id);
    console.log(bl7);

  }
  if (isLoading) {
    return <div className="flex justify-center w-full"><HashLoader color='#68d391' />
    </div>
  }
  if (isError) {
    return <div className="flex justify-center w-full"><p>error</p>
    </div>
  }

  return (
    <>
      <h2 className='text-4xl w-full text-center font-extrabold m-auto'> Our Products</h2>
      {data?.data.data.map(product => <ProductItem key={product.id} addCart={addToCartItem} product={product} />)}


    </>
  )
}
