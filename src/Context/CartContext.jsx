import axios from "axios";

import { createContext } from "react";

const headers = {
    token: window.localStorage.getItem('token')
}
export let CartContext = createContext();

function addProductToCart(productId) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        { productId },
        { headers }

    ).then(res => res)
        .catch(err => err);
}
export default function CartContextProvider({ children }) {
    return <CartContext.Provider value={{ addProductToCart }}>
        {children}
    </CartContext.Provider>
}