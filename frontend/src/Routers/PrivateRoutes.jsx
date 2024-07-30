import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../Context/usercontext'
import axios from 'axios';
import Spinner from '../components/Spinner/Spinner';
import { userauthapi } from '../ApiRoutes/api';


const PrivateRoutes = () => {

    const [auth,setAuth] = useAuth();
    const [ok,setOk] = useState(false);

    useEffect(()=>{
        const AuthCheck = ()=>{
            if(auth && auth?.user){
                setOk(true);
            }else{
                setOk(false);
            }

            console.log(auth?.user)
        }
        if(auth && auth?.user){
            AuthCheck();
        }
    },[auth && auth?.user]);

    return ok ? <Outlet/> : <Spinner/>;
}

export default PrivateRoutes;