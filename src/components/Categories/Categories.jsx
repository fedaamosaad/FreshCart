import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'
import axios from 'axios'
 
export default function Categories() {

let [categories ,setCategories]=useState([]) 
    useEffect(() => { getCategories()}, [])
function getCategories(){
   axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   .then(({ data }) => {
   setCategories(data.data)
    
  })
  .catch(({ err }) => console.log(err));
}


  // return (
  //   <>{categories.map(category=> 

  //   )}</>
  // )
}
