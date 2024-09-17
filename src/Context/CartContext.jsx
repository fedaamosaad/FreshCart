import axios from "axios";

import { createContext, useState } from "react";
export let CartContext = createContext();

const headers = {
    token: window.localStorage.getItem('token')
}

function addProductToCart(productId) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }

    ).then(res => res.data)
        .catch(err => err.response.data);
}
function getCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,

        { headers }

    ).then(res => res.data)
        .catch(err => err.response.data)
}
function removeProduct(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,

        { headers }

    ).then(res => res.data)
        .catch(err => err.response.data)
}
function updateProductCount(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count },
        { headers }

    ).then(res => res.data)
        .catch(err => err.response.data)
   
}
function cashOnDelivery(url, shippingAddress) {
    return axios.post(url,
        { shippingAddress },
        { headers }
    ).then(res => res.data)
        .catch(err => err.response.data)
}
function getOrders(userId) {
 return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,
      

    ).then(res => res.data)
        .catch(err => err.response.data)
}
export default function CartContextProvider({ children }) {

    let [cartId, setCartId] = useState(null)
    let [cartItemsNum, setCartItemsNum] = useState(null)
    return <CartContext.Provider value={{cartItemsNum, setCartItemsNum,getOrders, cartId, setCartId, addProductToCart, getCart, removeProduct, updateProductCount, cashOnDelivery }}>
        {children}
    </CartContext.Provider>
}