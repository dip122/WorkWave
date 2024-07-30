import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/usercontext'
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { employeeapi } from '../ApiRoutes/api';
import Spinner from '../components/Spinner/Spinner';

const EmployeeRoutes = () => {

    const [auth,setAuth] = useAuth();
    const [ok,setOk] = useState(false);

    useEffect(()=>{
        const AuthCheck = ()=>{
            if(auth?.user?.role === 'employer'){
                setOk(true);
            }else{
                setOk(false);
            }
        }

        if(auth && auth?.user){
            AuthCheck();
        }
    },[auth && auth?.user]);


    return ok ? <Outlet/> : <Spinner/>
}

export default EmployeeRoutes