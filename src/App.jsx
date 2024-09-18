import { useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import './App.css'
import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Login from './components/Login/Login'
import NotFound from './components/NotFound/NotFound'
import CounterContextProvider from './Context/CounterContext'
import UserTokenContextProvider from './Context/UserTokenContext'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Products from './components/Products/Products'
import  { CartContext } from './Context/CartContext'
import CheckOut from './components/checkOut/checkOut';
import Orders from './components/Orders/Orders';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import ResetPassword from './components/ResetPassword/ResetPassword';



let query = new QueryClient()
const routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Register /> },
      { path: 'home', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: 'forgotpassword', element: <ForgotPassword /> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
      { path: 'checkout/:cartId', element: <ProtectedRoutes><CheckOut /></ProtectedRoutes> },
      { path: 'allorders', element: <ProtectedRoutes><Orders /></ProtectedRoutes> },
      { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
      { path: 'productdetails/:id/:categoryId', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },
    ]
  }
])
function App() {
  let {getCart,setCartItemsNum}=useContext(CartContext)
useEffect(() => {
  getCartItems()   
}, [])

async function getCartItems() {
  let res = await getCart()
 
   
    setCartItemsNum(res.numOfCartItems) 
    
      
  
}
  return (
    <>
      <QueryClientProvider client={query}>
        <UserTokenContextProvider>
          <CounterContextProvider>
           
              <RouterProvider router={routes}> </RouterProvider>
              <Toaster/>
            
            <ReactQueryDevtools></ReactQueryDevtools>
          </CounterContextProvider>
        </UserTokenContextProvider>
      </QueryClientProvider>

    </>
  )
}

export default App
