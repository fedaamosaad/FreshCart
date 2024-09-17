import axios from "axios";
import React, { useEffect, useState } from "react";
import { HashLoader } from 'react-spinners'
import { Link } from "react-router-dom";

// 
// 
// 
// under developmennttntntntnt
// 
// 
// 
export default function Brands() {

  const [Brands, setBrands] = useState([]);
  window.scrollTo(0, 0);
    


  
  function getBrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`) 
      .then((res) => {
        setBrands(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching Brands:", error); 
      });
  }

  
  useEffect(() => {
    getBrands();
  }, []); 

  return (
    <>
      
      {Brands.length > 0 ? (
        <div className="container mx-auto">
        
          <h2 className="text-2xl uppercase font-extrabold pt-3 text-center py-4 my-5 w-5/6 md:w-1/3 mx-auto ">
            Shop Popular Brands
          </h2>

          <div className="row ">
            
            {Brands.map((brand) => (
              <div key={brand._id} className="  md:w-1/3">
                <div className="category mx-7 ml-11 my-5">
                  <div className="text-center  rounded-xl bg-transparent py-8 bg-gray-50  ">
                    <Link to={`/brandsProducts/${brand.name}`}>
                    
                      <div className=" flex items-center justify-center mx-8  mt-1">
                        <img
                          src={brand.image}
                          className="w-full rounded-xl  transition-all  shadow-lg  hover:shadow-xl  duration-800   object-cover "
                          alt={brand.name} 
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className='flex justify-center items-center  min-h-[70vh]'><HashLoader color='#68d391' /></div>
      )}
    </>
  );
}