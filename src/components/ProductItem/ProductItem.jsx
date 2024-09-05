import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


export default function ProductItem({ product ,addCart}) {
  let [count, setCount] = useState(0);
  useEffect(() => { }, []);
  console.log(product);

  return (
    <>
      <div key={product.id} className="text-start w-1/5 p-1">
        <div className="product relative p-1.5">
          <div className="product-overlay absolute top-2 left-2 w-full h-full">
            <div className="h-full flex flex-col justify-between">
              <div className="  flex justify-between items-start">
                {product.priceAfterDiscount ?
                  <div className="sale bg-red-500 text-white w-10 h-6 rounded flex justify-center items-center">
                    -{Math.round((product.price - product.priceAfterDiscount) / product.price * 100)}%
                  </div>
                  : <div></div>
                }
                <div className="product-options flex flex-col gap-xxs relative left-16 group-hover:left-0 duration-300">
                  {/* <ToggleFavorite productId={product.id} color={`black`} favorite={favorite} fn={fn}></ToggleFavorite> */}

                </div>
              </div>

            </div>
          </div>
          <Link to={`/productdetails/${product.id}/${product.category._id}`}>
            <img src={product.imageCover} className='w-full' alt="" />
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
          </Link>
          <button onClick={()=>addCart(product.id)} className='btn hover:bg-green-600'>Add to Cart</button>
        </div>
      </div>
    </>
  );
}
