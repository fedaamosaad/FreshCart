import { useState } from 'react'

import './App.css'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import Register from './components/Register/Register'
import Cart from './components/Cart/Cart'
import About from './components/About/About'
import Categories from './components/Categories/Categories'
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
import CartContextProvider from './Context/CartContext'


let query = new QueryClient()
const routes = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <Register /> },
      { path: 'home', element: <ProtectedRoutes><Home /></ProtectedRoutes> },
      { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
      { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
      { path: 'about', element: <ProtectedRoutes><About /></ProtectedRoutes> },
      { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
      { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
      { path: 'productdetails/:id/:categoryId', element: <ProtectedRoutes><ProductDetails /></ProtectedRoutes> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <NotFound /> },

    ]
  }
])
function App() {

  return (
    <>
      <QueryClientProvider client={query}>
        <UserTokenContextProvider>
          <CounterContextProvider>
            <CartContextProvider>
              <RouterProvider router={routes}> </RouterProvider>
            </CartContextProvider>
            <ReactQueryDevtools></ReactQueryDevtools>
          </CounterContextProvider>
        </UserTokenContextProvider>
      </QueryClientProvider>

    </>
  )
}

export default App
