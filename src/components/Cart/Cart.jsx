import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { HashLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import CartItem from '../CartItem/CartItem'

export default function Cart() {
  let { setCartItemsNum, getCart, removeProduct, updateProductCount, setCartId, cartId } = useContext(CartContext)
  let [cartInfo, setCartInfo] = useState(null)
  let navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  useEffect(() => { getCartItems() }, [])
  async function getCartItems() {
    let res = await getCart()
    if(res.data){
      setCartId(res.data._id)
      setCartInfo(res);
      setLoading(false)
      console.log(cartInfo, 'ressss');
      setCartItemsNum(res.numOfCartItems)   
    }
  }
  async function removeItem(id) {
    let res = await removeProduct(id)
    setCartInfo(res)
    setCartItemsNum(res.numOfCartItems)
  }
  async function updateCount(id, count) {
    if (count == 0) return
    let res = await updateProductCount(id, count)
    setCartInfo(res)
  }
  function goCheckOut() {
    navigate(`/checkout/${cartId}`)
  }
  return (
    <><div className='mt-5 min-h-[70vh]'>
      {loading ? <div className='flex justify-center items-center  min-h-[70vh]'><HashLoader color='#68d391' /></div> :
        <>
          <h1 className='text-4xl text-center  font-bold'>Your Cart</h1>
          <div className="flex flex-wrap">
            <div className="md:w-3/4 w-10/12 mx-auto relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartInfo.data.products.filter(ele => ele.count != 0).map(ele => <CartItem key={Cart} ele={ele} updateCount={updateCount}removeItem={removeItem}/>
                  )}
                </tbody>
              </table>
            </div>
            <div className='md:w-1/5 w-10/12 shadow-lg md:mt-0 mt-14 h-fit py-5 px-3'>
              <h2 className="pt-2 pb-3 px-2 font-semibold text-lg text-green-500 ">
                Cart Summary
              </h2>
              <h2 className="pt-3 pb-4 px-2 font-semibold text-base text-green-500 ">
                Total Cart Items :{cartInfo.numOfCartItems}
              </h2>
              <h2 className="pt-3 pb-4 px-2 font-semibold text-base text-green-500 ">
                Total Price = {cartInfo.data.totalCartPrice} EGP
              </h2>
              <button
                onClick={goCheckOut}
                type="button"
                className="text-white w-4/5 mx-auto bg-green-500  hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 my-2 text-center flex items-center justify-center"
              >
                CheckOut
                <i className="fa-solid fa-cart-plus text-white text-base px-2"></i>
              </button>
            </div>
          </div></>
      }</div>
    </>
  )
}
