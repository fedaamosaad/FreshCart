import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './ProductItem.module.css';
import addtocart from '../../assets/images/icon add-to-cart.png'


export default function ProductItem({ product, addCart, loading, currentIds }) {

  let [items, setItems] = useState([]);
  function changeState(id) {
    setItems([])
    setTimeout(() => {
      items[id] = true;
      setItems(items)
    }, 0);
  }
  useEffect(() => { }, []);


  return (
    <>
      <div key={product.id} className="text-start sm:w-5/6 mx-auto lg:w-1/5 md:w-1/2 p-1">

        <div className={`${style.producteye} product relative p-1.5`}>
          <Link to={`/productdetails/${product.id}/${product.category._id}`}>
            <i className='fa-eye fas absolute p-3 rounded-xl bg-white/45 hover:bg-green-500/20 z-30 right-1'></i>
          </Link>
          <div className="product-overlay absolute top-2 left-2 w-full h-full"></div>
          <div className="h-full flex flex-col justify-between">
            <div className="absolute  flex justify-between items-start">
              {product.priceAfterDiscount ?
                <div className="sale bg-red-500 text-white w-10 h-6 rounded flex justify-center items-center">
                  -{Math.round((product.price - product.priceAfterDiscount) / product.price * 100)}%
                </div>
                : <div></div>}
              <div className="product-options flex flex-col gap-xxs relative left-16 group-hover:left-0 duration-300">
                {/* <ToggleFavorite productId={product.id} color={`black`} favorite={favorite} fn={fn}></ToggleFavorite> */}
              </div>
            </div>
          </div>
          <div className='h-5/6'>
            <img src={product.imageCover} className='w-full  ' alt="" />
            <div className="px-3"><span className='text-green-500 font-light'>{product.category?.name}</span>
              <h2 className='text-lg font-bold mb-3'>
                {product.title.split(" ").splice(0, 2).join(' ')}
              </h2>
              <div className='flex justify-between'>
                {product.priceAfterDiscount ? (
                  <>
                    <span className='text-red-500 text-sm font-bold'>{product.priceAfterDiscount} EGP</span>
                    <span className='line-through text-gray-500'>{product.price} EGP</span>
                  </>
                ) : (
                  <span>{product.price} EGP</span>
                )}
                <span><i className='fa-star fa-solid text-yellow-500'></i> {product.ratingsAverage}</span>
              </div>
            </div>
          </div>
          <button onClick={() => { addCart(product.id); changeState(product.id) }} className='btn hover:bg-green-600 px-5 py-2'>
            {loading && currentIds[product.id] ? <i className='fa fa-spin fa-spinner'></i> : <span className=' flex flex-wrap justify-center items-center'><img src={addtocart} className='w-5 me-2' alt="" /> Add to Cart</span>}
            {/*  */}
          </button>
        </div>
      </div>
    </>
  );
}
