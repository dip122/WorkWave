import React from 'react'
import { useEffect,useContext,createContext,useState } from 'react'
import axios from 'axios'

const AuthContext = createContext();
const AuthProvider = ({children})=>{

    const [auth,setAuth] = useState({
        user : null,
        token : "",
    });

    axios.defaults.headers.common["Authorization"] = auth?.token;//token is set in Authorization

    useEffect(()=>{
        const jsondata = localStorage.getItem('auth');
        if(jsondata){
            const data = JSON.parse(jsondata);
            setAuth({
                ...auth,
                user : data.user,
                token : data.token
            })
        }
        //eslint-disable-next-line
    },[]);

    return (
        <AuthContext.Provider value = {[auth,setAuth]}>{children}</AuthContext.Provider>
    );
}

const useAuth = ()=>useContext(AuthContext);//custom hook 

export {useAuth,AuthProvider};