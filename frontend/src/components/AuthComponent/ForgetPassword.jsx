import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { forgetpasswordapi } from '../../ApiRoutes/api';
import axios from 'axios';

const ForgetPassword = () => {

    const [email, setEmail] = useState("");

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }
    const MakeValidation = ()=>{
        if(!validateEmail(email)){
            toast.error("Please Enter Your Valid Email Address");
            return false;
        }
        return true;
    }
    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!MakeValidation())return false;
        try{
            const formData = new FormData();
            formData.append('email',email);
            const response = await toast.promise(
                axios.post(forgetpasswordapi, formData, {
                    withCredentials : true,
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                }),{
                    pending : "Email Sending...",
                    error : "Email cannot be sent"
                }
            );
            if(response && response.data.success){
                toast.success(response.data.message);
            }else{
                console.log(response.data);
                toast.error("Something went wrong");
            }
        }catch(error){
            console.log(error);
            return false;
        }
    }
  return (
<div className="flex flex-col min-h-screen justify-center items-center bg-neutral-200 p-8 w-full space-y-10">
    <div className="text-5xl font-extrabold text-gray-800 mb-10 p-3">Forget Password</div>
    <form className="mt-8 space-y-6 md:w-[30%] w-[75%]" onSubmit = {handleSubmit}>
      <div className="rounded-md space-y-6 w-full">
        <input 
          type="text" 
          placeholder="Enter Your Email"
          className="appearance-none relative block w-full p-6 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className = "flex justify-center items-center">
          <button type = "submit" className = "w-2/5 bg-purple-500 hover:bg-purple-600 px-4 py-3 h-full text-white font-semibold ">Submit</button>
        </div>
      </div>
    </form>
    <ToastContainer/>
  </div>
  )
}

export default ForgetPassword