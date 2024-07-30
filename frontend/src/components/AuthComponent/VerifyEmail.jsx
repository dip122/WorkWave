import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { emailverifyapi } from '../../ApiRoutes/api';

const VerifyEmail = () => {

    const {id,token} = useParams();
    const navigate =  useNavigate();

    const handleClick = async()=>{
        try{
            console.log(id);
            console.log(token);
            const url = emailverifyapi + `${id}/${token}`;
            console.log(url);
            const response = await toast.promise(
                axios.post(url),
                {
                    pending : "Processing",
                    error : "Error in verifying email"
                }
            );
            if(response && response.data.success){
                toast.success(response.data.message);
                setTimeout(()=>{
                    navigate('/');
                },3000)
            }else{
                toast.error(response.data.message);
            }
        }catch(error){
            toast.error("Server side error Occured");
            console.log(error);
        }
    }

    
  return (
    <div className = "flex justify-center items-center p-4 text-center min-h-screen">
        <button className = "bg-purple-500 hover:bg-pruple-600 w-[35%] px-5 py-4 text-white font-semibold border border-tansition focus:outline-none" onClick = {handleClick}>Verify</button>
        <ToastContainer/>
    </div>
  )
}

export default VerifyEmail