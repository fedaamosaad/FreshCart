import { useState } from "react"
import { createContext } from "react" 

export let CounterContext =createContext(0)

export default function CounterContextProvider(props){
    let [counter ,setCounter]= useState(10)
    return <CounterContext.Provider value={{counter,setCounter} }>
{props.children}
    </CounterContext.Provider>
}