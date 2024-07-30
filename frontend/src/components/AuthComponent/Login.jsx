import React from 'react'
// import '../../Css/auth.css'
import { useState } from 'react';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { loginapi } from '../../ApiRoutes/api';
import { useAuth } from '../../Context/usercontext';

const Login = () => {

  const [role,setRole] = useState("select");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();


  const toastoptions = {
    postion : 'bottom-right',
    autoclose : 8000,
    pauseOnHover : true,
    draggable : true,
}

  const validateEmail = (email)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const MakeValidation = ()=>{
    if(role === ""){
      toast.error("Please enter your role",toastoptions);
      return false;
    }else if(email === "" || !validateEmail(email)){
      toast.error("Please enter correct email address",toastoptions);
      return false;
    }else if(password === ""){
      toast.error("Please enter correct password",toastoptions);
      return false;
    }
    return true;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(MakeValidation()){
      try{
        const response = await axios.post(loginapi,{
          role,
          email,
          password
        });
        if(response && response.data.success === true){
          console.log('success');
          toast.success("Successfully logged in");
          setAuth({
            ...auth,
            user : response.data.user,
            token : response.data.token
          });//whenever login in we set the new value
          await localStorage.setItem('auth',JSON.stringify(response.data))
          setTimeout(()=>{
            navigate('/home');
          },3000);
        }else{
          toast.error(response.data.message);
        }
      }catch(error){
        // console.log(error);
        toast.error("some went wrong in server side",toastoptions);
      }
    }
  }

  return (
  <div className="flex flex-col min-h-screen justify-center items-center bg-neutral-200 p-8 w-full space-y-10">
    <div className="text-5xl font-extrabold text-gray-800 mb-10 p-3">Login</div>
    <form className="mt-8 space-y-6 md:w-[30%] w-[75%]" onSubmit = {handleSubmit}>
      <div className="rounded-md space-y-6 w-full">
        <select
          value={role}
          className=" text-2xl font-semibold relative block w-full p-6 border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="select" className="text-gray-900">Select</option>
          <option value="job seeker" className="text-gray-900">Job Seeker</option>
          <option value="employer" className="text-gray-900">Employer</option>
        </select>
        <input 
          type="text" 
          placeholder="Enter Your Email"
          className="appearance-none relative block w-full p-6 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Enter Your Password"
          className="appearance-none relative block w-full p-6 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

export default Login