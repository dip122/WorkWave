import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { resetpasswordapi } from '../../ApiRoutes/api';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmPassword] = useState("");

    const {token} = useParams();
    const MakeValidation = ()=>{
        if(password === "" || confirmpassword === ""){
            toast.error("Please Enter Passwords")
            return false;
        }else if(password !== confirmpassword){
            toast.error("Password donot match")
            return false;
        }
        return true;
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!MakeValidation())return false;
        try{
            const formData = new FormData();
            formData.append('password',password);
            const url = resetpasswordapi + `/${token}`
            console.log(url);
            const response = await toast.promise(
                axios.post(url, formData, {
                    withCredentials : true,
                    headers : {
                        "Content-Type" : "multipart/form-data"
                    }
                }),
                {
                    pending : "Password Reseting...",
                    error : "Somgthing went wrong"
                }
            );
            if(response && response.data.success){
                toast.success("Password reset successful");
                console.log('clicked')
                return true;
            }else{
                toast.error("Time limit exceed");
                return false;
            }
        }catch(error){
            console.log(error);
            return false;
        }
    }
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-neutral-200 p-8 w-full space-y-10">
    <div className="text-5xl font-extrabold text-gray-800 mb-10 p-3">Reset Password</div>
    <form className="mt-8 space-y-6 md:w-[30%] w-[75%]" onSubmit = {handleSubmit}>
      <div className="rounded-md space-y-6 w-full">
        <input 
          type="password" 
          placeholder="Enter Your Password"
          className="appearance-none relative block w-full p-6 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Confirm Your Password"
          className="appearance-none relative block w-full p-6 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword