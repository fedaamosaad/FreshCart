import React, { useContext, useEffect, useState } from 'react'
import styles from './Orders.module.css'
import { CartContext } from '../../Context/CartContext'
import { UserTokenContext } from '../../Context/UserTokenContext'
import { Accordion } from "flowbite-react";
import 'flowbite/dist/flowbite.css';
import CartItem from '../CartItem/CartItem';

export default function Orders() {
  let { getOrders } = useContext(CartContext)
  let { userId } = useContext(UserTokenContext)
  let [orders, setOrders] = useState([])
  useEffect(() => { if (userId) getAllOrders() }, [userId])
  async function getAllOrders() {
    let x = await getOrders(userId)
    console.log(x);
    setOrders(x)
  }
  return (
    <>
      <div className='mt-5'> <Accordion collapseAll>
        <h1 className='text-center py-3 text-xl'>All Orders</h1>
        {orders.reverse().map(order =>  <Accordion.Panel  key={order._id}>
          <Accordion.Title className='relative '>
            <div className='flex  w-100 '>
            <div className='flex  justify-center mx-3'>
              <span>Order Date:{order?.updatedAt?.slice(0, 10)}</span>             
            </div>
            <div className='flex justify-center mx-2  '>
              <span>Total: {order?.totalOrderPrice}EGP</span>
            </div>
            <div className='flex justify-center mx-3  '>
              <span>Delivery status:<i className='mx-1 fas fa-truck-fast text-green-500'></i> {order.isDelivered ? "Delivered" : "On The Way"}</span>
            </div>
            <div className='absolute right-8 me-3 ' >
              ORDER # {order._id}
            </div>
          </div>
          </Accordion.Title>
          <Accordion.Content>
          <table className="w-full md:w-3/4 mx-auto text-sm text-left rtl:text-right text-gray-500 ">
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
                    
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.filter(ele => ele.count != 0).map(ele => <CartItem  ele={ele} showActions={false} />
                  )}
                </tbody>
              </table>
          </Accordion.Content>
        </Accordion.Panel>)}

      </Accordion>
      </div>
    </>
  )
}
