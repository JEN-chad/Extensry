import {  createContext, useContext } from "react";
import { useReducer } from "react";
import { browserReducer } from "../reducer/browser-reducer";

const browserContext = createContext();

const initialstate = {
    name: "",
    time: "",
    message: "",
    task: null
}

const BrowserContextProvider = ({children}) =>{

    const [{name, time, message, task}, browserDispatch] = useReducer(browserReducer, initialstate)
    return(
        <browserContext.Provider value={{name, time, message,task, browserDispatch}}>
         {children}
        </browserContext.Provider>
    )
}

const useBrowsercontext = () => useContext(browserContext);

export {useBrowsercontext , BrowserContextProvider};