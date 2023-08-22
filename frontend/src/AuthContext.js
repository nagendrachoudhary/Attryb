import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginApi, tokenApi } from './Componant/Api';
import { useNavigate } from 'react-router-dom';
export const AuthContext = createContext();
export function AuthContextProvider({ children }) {
    // Initialize your authentication state and functions here
    const [user, setUser] = useState(null); // You can set the initial user state to null
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Define your authentication functions (e.g., login, logout) here
    const login = async (data) => {
      await  LoginApi(data).then((res)=>{
          if(!res){
            alert("Error");
            return;
            };
            console.log(res);
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(true)
            window.location="/"
        }).catch((err)=>{
          alert(`error! Check mail and password again and create new account`)})
        
    }; 
  
    const logout = () => {
      localStorage.removeItem('token');
      setUser(null)
      setIsLoggedIn(false);
      window.location="/login"
    };
    useEffect(() => {
        let token = JSON.stringify(localStorage.getItem("token"))
        if(token){
            tokenApi('token').then((res)=>{
              setUser(res.data)
            }).catch((err)=>{
              console.error(err);
            })
        }
        
      }, [setIsLoggedIn])
    // Create the context value to be provided to the components
    const authContextValue = {
      user,
      isLoggedIn,
      login,
      logout,
    };
  
    // Return the AuthContext.Provider with the context value and children
    return (
      <AuthContext.Provider value={authContextValue}>
        {children}
      </AuthContext.Provider>
    );
  }
  export function useAuth() {
    return useContext(AuthContext);
  }
    