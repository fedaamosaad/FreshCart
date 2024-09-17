import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import RecentProducts from '../RecentProducts/RecentProducts';

export default function Products() {
    let [products,setProducts]=useState([])
    function getProducts() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products?page=1')}
   
   let {isLoading,data,isError } =useQuery({
     queryKey:['Products'],
     queryFn:getProducts,
     staleTime:10000,
     
   })
   console.log('data=>',data);
   console.log('isLoading=>',isLoading);
  

  return (
     <div className="row mt-5">
    <RecentProducts />
     </div>
  )
}
