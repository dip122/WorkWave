import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useAuth } from '../../Context/usercontext';
import { getallprofilesapi } from '../../ApiRoutes/api';
import UserCard from './UserCard';

const AllUsers = () => {

    const [profiles,setProfiles] = useState([]);

    const [auth,setAuth] = useAuth();

    useEffect(()=>{
        const getallprofiles = async()=>{
            try{
                const response = await axios.get(getallprofilesapi);
                if(response && response.data.success){
                    setProfiles(response.data.allprofile);
                    console.log(response.data.allprofile);
                }else{
                    setProfiles([]);
                }
            }catch(error){
                console.log(error);
                setProfiles([]);
            }
        }

        if(auth && auth?.user){
            getallprofiles();
        }
    },[auth && auth?.user])
  return (
    <div className = "min-h-screen bg-neutral-200">
        <div className = "header text-4xl font-semibold flex justify-center items-center text-center p-2 mt-10">All profiles</div>
        <div className = "alluser">
            <UserCard profiles = {profiles}/>
        </div>
    </div>
  )
}

export default AllUsers