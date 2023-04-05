import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export const OnLogoutClick = ()=>{
    const {onLogout}= AuthContext(onLogout)
    useEffect(()=>{
        onLogout()
    },[onLogout])
        return <Navigate to='/'/>
    }
