import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProducts.module.css'
import axios from 'axios'
import ProductItem from '../ProductItem/ProductItem'
import { useQuery } from '@tanstack/react-query'
import { HashLoader } from 'react-spinners'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import ReactPaginate from 'react-paginate';
import toast from 'react-hot-toast'

export default function RecentProducts() {
  let { addProductToCart ,cartItemsNum, setCartItemsNum} = useContext(CartContext)
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(2);
  let [currentIds, setCurrentIds] = useState([]);



  function getProducts(page) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`)

  }


  let { isLoading, data, isError } = useQuery({
    queryKey: ['Products', page],
    queryFn: () => getProducts(page),
    keepPreviousData: true,
    staleTime: 10000,
  });
  console.log('data=>', data);
  console.log('isLoading=>', isLoading);

  async function addToCartItem(id) {
    currentIds = []
    setLoading(true)
    setTimeout(() => {
      currentIds[id] = true
      setCurrentIds(currentIds)
    }, 10);


    setTimeout(() => {
      console.log(currentIds, ' idssss');
    }, 5000);


    let data = await addProductToCart(id);
    if (data.status == 'success') {
      let newCartItemsNum =cartItemsNum+1;
      setCartItemsNum(newCartItemsNum)
      toast.success(data.message, {
        duration: 5000
      })
    }else{
      toast.error(data.message, {
        duration: 5000
      })
    }
    setLoading(false)
  }


  if (isLoading) {
    return <div className="flex justify-center w-full"><HashLoader color='#68d391' />
    </div>
  }
  if (isError) {
    return <div className="flex justify-center w-full"><p>Error loading products. Please try again later.</p>
    </div>
  }


  return (
    <>
      <h2 className='text-4xl  mt-5 w-full text-center font-extrabold m-auto'> Our Products</h2>
      {data?.data.data.map(product => <ProductItem key={product.id} addCart={addToCartItem} currentIds={currentIds} loading={loading} product={product} />)}

      <div className=" mt-6 w-5/6 flex mx-auto">
        {page < totalPage && (<button className='btn w-1/3 mx-auto px-5 py-2' onClick={() => setPage(page + 1)}>Next Page <i className='fa-arrow-right fas'></i></button>)}
        {page == totalPage && (<button className='btn w-1/3 mx-auto  px-5 py-2' onClick={() => setPage(page - 1)}>Previous Page <i className='fa-arrow-left fas'></i></button>)}
      </div>
    </>
  )
}
