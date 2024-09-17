import React, {  useEffect, useState } from 'react'

import { Navigate } from 'react-router-dom'
 
export default function ProtectedRoutes({children}) {

let [count ,setCount]=useState(0) 
    useEffect(() => { }, [])
if(localStorage.getItem("token")){
  return children
}else{
   return <Navigate to={'/login'}/>
}
 
}
