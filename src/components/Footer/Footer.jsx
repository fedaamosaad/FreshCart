import React from "react";
import style from './Footer.module.css'
import visaImage from "./../../assets/images/visa-yCpM8g53.png";
import AmericanExpressImage from "./../../assets/images/americanexpress-CMM8_EPJ.png";
import masterCardImage from "./../../assets/images/mastercard-CSECIFJt.png";
import payPalImage from "./../../assets/images/paypal-K1KLKngS.png";
import appleImage from "./../../assets/images/apple-L5ABwq0z.png";
import playstoreImage from "./../../assets/images/playstore-BBcFwflQ.png";


export default function Footer() {
  return (
    <>
      
      <footer className={`${style.footer}  w-full text-center px-3 py-4 dark:bg-[#121212]  border-gray-100 dark:border-black border `}>
        <div className="container  m-auto">
          
          <div className="flex flex-col items-start pt-4 pb-3">
            <h3 className="font-serif text-2xl dark:text-white text-slate-800 pb-1">
              Get the FreshCart app
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              We will send you a link, open it on your phone to download the
              app.
            </p>
          </div>

          
          <div className="flex items-center pb-5">
            <input
              type="email"
              id="footerEmail"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-3/4 p-2 mx-2 dark:bg-zinc-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              placeholder="Email Address"
            />
            <button
              type="button"
              className=" text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm h-10  md:w-1/5 md:px-0  md:h-9   px-1 dark:bg-emerald-500 dark:hover:bg-emerald-400"
            >
              Share Link
            </button>
          </div>

        
          <div>
            <hr className="dark:border-zinc-700 border-gray-300" />
          </div>

         
          <div className="md:flex md:flex-row flex-col flex  md:items-center md:justify-between pt-4 px-3">
           
            <div>
              <div className="images md:flex flex  gap-2">
                <p className="text-xl text-gray-700 dark:text-white">
                  Payment Partners
                </p>
                <img src={visaImage} className="h-7" alt="Visa" />
                <img
                  src={AmericanExpressImage}
                  className="h-7"
                  alt="American Express"
                />
                <img src={masterCardImage} className="h-7" alt="MasterCard" />
                <img src={payPalImage} className="h-7" alt="PayPal" />
              </div>
            </div>

           
            <div className="md:flex md:flex-row flex flex-col items-center gap-2 md:pt-0 pt-3">
              <p className="text-xl text-gray-700 px-2 dark:text-white">
                Get deliveries with FreshCart
              </p>
              <button>
                <img src={appleImage} className="h-9" alt="Apple Store" />
              </button>
              <button>
                <img
                  src={playstoreImage}
                  className="h-9"
                  alt="Google Play Store"
                />
              </button>
            </div>
          </div>

          
          <div className="pt-3 pb-10">
            <hr className="dark:border-zinc-700 border-gray-300" />
          </div>
          <p className="m-auto">© 2024 <a className="hover:text-green-500" href="https://www.linkedin.com/in/fedaa-mosaad-8592aa31a/">Fedaa Mosaad</a> All rights reserved</p>
        </div>
      </footer>
    </>
  );
}