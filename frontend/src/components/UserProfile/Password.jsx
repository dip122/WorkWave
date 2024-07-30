import React, { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { updatepasswordapi } from '../../ApiRoutes/api';
import '../../Css/Password.css';
import { useAuth } from '../../Context/usercontext';

const Password = () => {

  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [auth,setAuth] = useAuth();

  const MakeValidation =()=>{
    if(password === "" || confirmPassword === ""){
      toast.error("Enter password ");
      return false;
    }
    if(password!==confirmPassword){
      toast.error("Password donnot match");
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
      const response = await axios.post(updatepasswordapi,formData,{
        withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
      });
      if(response && response.data.success){
        toast.success(response.data.message);
        setAuth({
          ...auth,
          user : response.data.newuser,
        });
        console.log(auth);
        console.log(response.data.newuser);
      }else{
        toast.error(response.data.message);
      }
    }catch(error){
      console.log(error);
      toast.error('Error in Api request');
      return false;
    }
  }

  return (
    <div className = "password">
        <div className = "header">Update Your Password</div>
        <form onSubmit = {handleSubmit}>
            <input type = "text" placeholder = "Enter New Password" 
            value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type = "text" placeholder = "Confirm Your Password" 
            value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <button type = "submit">Update Password</button>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Password