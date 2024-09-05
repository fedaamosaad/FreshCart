import React from "react";
import logo from "./../../assets/images/freshcart-logo.svg";
import logo2 from "./../../assets/images/CartIcon.svg";

import { HashLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <>
      <div className=" fixed inset-0 flex flex-col items-center justify-center bg-white/25 z-50">
        <div className="flex items-center ">
          <img src={logo2} className="h-16" alt="FreshCart Logo" />
         <h2 className="font-extrabold text-4xl">Fresh Cart</h2>
        </div>
        <div className="flex mt-3 justify-center"><HashLoader color='#68d391' />
        </div>
      </div>
    </>
  );
}