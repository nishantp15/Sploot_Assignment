import { useState } from "react";
import { createContext } from "react";

export const AppContext = createContext()

function AppContextProvider({children}) {

    const [authState, setAuthState] = useState({
        isAuth:false,
        token:null
    })
    const loginUser = (value)=>{
       value !== undefined && setAuthState({
            isAuth:true,
            token:value
        })
    }
    const logoutUser=()=>{
            setAuthState({
                isAuth:false,
                token:null
            })
    }
return (<AppContext.Provider value={{authState, loginUser, logoutUser}}>
    {children}
</AppContext.Provider>)
}

export default AppContextProvider;
