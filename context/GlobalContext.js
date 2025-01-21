'use client';
import { useContext, createContext, useState} from "react";

//Create a context
const GlobalContext = createContext();

//Create a provider
export const GlobalProvider = ({children}) => {
    const [unreadCount, setUnreadCount] = useState(0);
    return (
        <GlobalContext.Provider value={{unreadCount, setUnreadCount}}>
            {children}
        </GlobalContext.Provider>
    )
}

//Create a custom hook
export const useGlobalContext = () => {
    return useContext(GlobalContext);
}