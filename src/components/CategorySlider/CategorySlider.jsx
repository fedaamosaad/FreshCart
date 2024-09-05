import axios from "axios"; 
import React, { useEffect, useState } from "react"; 
import { Link } from "react-router-dom"; 
import Slider from "react-slick"; 
import Loader from "../Loader/Loader"; 


export default function CategorySlider() {
 
  const [Categories, setCategories] = useState([]);

  
  const settings = {
    dots: false,
    infinite: true, 
    speed: 550,
    slidesToShow: 5, 
    slidesToScroll: 2, 
    autoplay: true, 
    autoplaySpeed: 3000, 
    pauseOnHover: false, 
    arrows: true, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false, 
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false, 
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false, 
        },
      },
    ],
  };


  function getCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`) 
      .then((res) => {
        setCategories(res.data.data); 
      })
      .catch((res) => {}); 
  }

  
  useEffect(() => {
    getCategories(); 
  }, []); 


  return (
    <>
     
      {Categories.length > 0 ? (
        <div className="container mx-auto lg:w-full  w-11/12 ">
         
          <h2 className="text-xl  py-4 font-semibold   bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-emerald-700 dark:from-emerald-300 dark:to-emerald-500">
            Shop Popular Categories
          </h2>

          <Slider {...settings}>
           
            {Categories.map((category) => (
              <div key={category._id} className="text-center pb-7 ">
                <Link to={`/categoryProducts/${category.name}`}>
                 
                  <div className=" flex items-center justify-center mx-1 rounded-full mt-1">
                    <img
                      src={category.image}
                      className="w-4/5 h-52 object-cover rounded-3xl"
                      alt={category.name} 
                    />
                  </div>
                 
                  <p className="font-semibold text-green-500 dark:text-white">
                    {category.name}
                  </p>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      ) : (
        <Loader /> 
      )}
    </>
  );
}