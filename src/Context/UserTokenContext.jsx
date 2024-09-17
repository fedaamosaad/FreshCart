import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
export let UserTokenContext = createContext(null);

export default function UserTokenContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState();
  function convertToken(){
    let data=jwtDecode(localStorage.getItem('token')) 
    setUserId(data.id)
    console.log(data,'sssssss');
    
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
     convertToken()
    }
  })
  return (
    <UserTokenContext.Provider value={{ token, setToken ,userId, convertToken}}>
      {children}
    </UserTokenContext.Provider>
  );
}
