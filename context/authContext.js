import { createContext, useContext, useEffect, useState } from "react";


//контекст авторизации
export const AuthContext = createContext();
//провайдер контекста авторизации
export const AuthContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);


    useEffect(()=>{
        //onAuthStateChanged
    },[]
    )

    const login = async (email, password)=>{
        try {
            
        } catch (error) {
            
        }
    }

    const logout = async ()=>{
        try {
            
        } catch (error) {
            
        }
    }

    const register = async (email, password, username, profileurl)=>{
        try {
            
        } catch (error) {
            
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const value = useContext(AuthContext);

    if (!value){
            throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }

    return value;
}