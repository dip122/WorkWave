import React, { useState } from 'react'
import '../../Css/auth.css'
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerapi } from '../../ApiRoutes/api';

const Register = () => {

  const [role,setRole] = useState("");
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmpassword,setConfirmPassword] = useState("");
  const [phoneno,setPhoneno] = useState("");
  const [badgeno,setBadgeno] = useState("");
  const navigate = useNavigate();

  const toastoptions = {
    postion : 'bottom-right',
    autoclose : 8000,
    pauseOnHover : true,
    draggable : true,
}

const validateEmail = (value) => {
  // Regular expression for validating email
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
};

  const MakeValidation = ()=>{
    if(name.length <3 ){
      toast.error("Name should be at least of 3 charecters",toastoptions);
      return false;
    }else if(name.length > 20){
      toast.error("Name should not of more than 20 charecters",toastoptions);
      return false;
    }else if(email === "" || !validateEmail(email)){
      toast.error("Please  enter the correct email address",toastoptions);
      return false;
    }else if(password === "" || confirmpassword === ""){
      toast.error("Please enter password and confrimpassword",toastoptions);
      return false;
    }else if(confirmpassword !== password){
      toast.error("password and confirmapassword are not matching",toastoptions);
      return false;
    }else if(phoneno === ""){
      toast.error("Please enter Your phoneno",toastoptions);
      return false;
    }else if(phoneno.length !== 10){
      toast.error("Phoneno should be of length 10 digits",toastoptions);
      return false;
    }

    return true;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(MakeValidation()){
      // console.log(role);
      try{
        const formData = new FormData()
        formData.append('role',role);
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        // formData.append('confirmpassword',confirmpassword);
        formData.append('phoneno',phoneno);
        formData.append('badgeno', badgeno);

        const response = await toast.promise(
          axios.post(registerapi, formData, {
            withCredentials : true,
            headers : {
              "Content-Type" : "multipart/form-data"
            }
          }),
          {
            pending : "Registering user ....",
            error : "Something went wrong"
          }
        )

        if(response && response.data.success){
          toast.success("Email has been sent , Verify!");
        }else{
          // console.log("Please double check all the fields");
          toast.error("Could not register,try again",toastoptions);
        }
      }catch(error){
        console.log(error);
        toast.error("Something went wrong in case of server",toastoptions);
      }
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen justify-center items-center bg-neutral-200 p-8 w-full space-y-10">
    <div className="text-5xl font-extrabold text-gray-800 mb-10 p-3">Register</div>
    <form className="mt-8 space-y-6 md:w-[30%] w-[75%]" onSubmit = {handleSubmit}>
      <div className="rounded-md space-y-6 w-full">
        <select
          value={role}
          className=" text-2xl font-semibold relative block w-full p-5 border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          onChange={(e)=>setRole(e.target.value)}
        >
          <option value="select" className="text-gray-900">Select</option>
          <option value="job seeker" className="text-gray-900">Job Seeker</option>
          <option value="employer" className="text-gray-900">Employer</option>
        </select>
        <input 
          type="text" 
          placeholder="Enter Your Name"
          className="appearance-none relative block w-full p-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input 
          type="email" 
          placeholder="Enter Your Email"
          className="appearance-none relative block w-full p-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Enter Your Password"
          className="appearance-none relative block w-full p-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Confirmpassword"
          className="appearance-none relative block w-full p-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={confirmpassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="Enter contact details"
          className="appearance-none relative block w-full p-5 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={phoneno}
          onChange={(e) => setPhoneno(e.target.value)}
        />
        <input 
          type="text" 
          placeholder="If You Are Employee Enter Your batch No"
          className="overlow-x-hidden appearance-none relative block w-full p-6 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          value={badgeno}
          onChange={(e) => setBadgeno(e.target.value)}
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

export default Register