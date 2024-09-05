import React, { useContext, useEffect, useState } from "react";
import style from "./Navbar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { UserTokenContext } from "../../Context/UserTokenContext";
import { toast, Toaster } from 'react-hot-toast';
export default function Navbar() {

  let navigate = useNavigate()
  let [count, setCount] = useState(0);
  let { token, setToken } = useContext(UserTokenContext);
  let [open, setOpen] = useState(false)

    function toggle() {
        setOpen(!open)
    }
  // console.log(token, "hello nav");

  useEffect(() => { }, []);
  function logOut() {
    setToken(null)
    localStorage.removeItem('token');
    navigate('/login');

  }

  const handleLogOut = () => {
    logOut();
    toast.success("Logged out successfully!", { duration: 2000, className: "text-success px-4 fw-bolder z-50" });
  }
  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (

    <nav className={` p-4 flex items-center justify-center fixed left-0 right-0 top-0 z-40 `}>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container mx-auto md:px-0 justify-between flex flex-col lg:flex-row items-center">
        <div className="left-side text-center items-center flex flex-col lg:flex-row ">
          <img src={logo} width={140} className="mr-7 lg:mb-0" />
          
          {token ? <>
            <ul className={`md:flex flex-col text-xl gap-2 lg:flex-row ${open ? 'block' : 'hidden'}`}>
              <li>
                <NavLink className="hover:text-green-500" to="home">Home</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-green-500" to="cart">Cart</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-green-500" to="brands">Brands</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-green-500" to="categories">Categories</NavLink>
              </li>
            </ul></> : null}
        </div>

        <ul className={`${open ? 'block' : 'hidden'}  md:flex flex-col gap-2  lg:flex-row `}>
          <li className="text-xl ">
            <i className="fa-brands fa-facebook m-1 "></i>
            <i className="fa-brands fa-instagram m-1"></i>
            <i className="fa-brands fa-twitter m-1"></i>
            <i className="fa-brands fa-youtube m-1"></i>
          </li>
          {token ?
            <li className="text-xl">
              <button className="hover:text-green-500" onClick={handleLogOut} to="login">Sign Out </button>
            </li>
            :
            <>
              <li className="text-xl">
                <NavLink to="login">Log In </NavLink>
              </li>
              <li className="text-xl">
                <NavLink to="register">Register </NavLink>
              </li>
            </>
          }
        </ul>
        <div className='md:hidden block '>
        <i 
  onClick={toggle} 
  className={`fas fa-2x absolute top-4 right-4 cursor-pointer ${open ? 'fa-times' : 'fa-bars'}`}>
</i>
        </div>
      </div>

    </nav >
  );
}
