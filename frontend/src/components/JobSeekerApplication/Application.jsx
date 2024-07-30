import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/usercontext';
import { applicationpostapi } from '../../ApiRoutes/api';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../Css/PostApplication.css';

const Application = () => {
  const [auth,setAuth] = useAuth();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [coverletter,setCoverletter] = useState("");
  const [address,setAddress] = useState("");
  const [phoneno,setPhoneno] = useState("");
  const [class10percentage,setClass10percentage] = useState("");
  const [class12percentage,setClass12percentage] = useState("");
  const [resume,setResume] = useState(null);
  const { id }  = useParams();

  const navigate = useNavigate();

  useEffect(()=>{
  },[]);

  const toastoptions = {
    postion : 'bottom-right',
    autoclose : 8000,
    pauseOnHover : true,
    draggable : true,
    style : {
      fontWeight : 'bold'
    }
  }

  const validateEmail = (value)=>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  }

  const MakeValidation = ()=>{
    if(name === ""){
      toast.error("Please enter your name",toastoptions);
      return false;
    }
    if(email === "" || !validateEmail(email)){
      toast.error("Please enter your email address",toastoptions);
      return false;
    }
    if(address === ""){
      toast.error("Please enter Your address",toastoptions);
      return false;
    }
    if(resume === null){
      toast.error("Please enter your resume",toastoptions);
      return false;
    }
    if(phoneno === ""){
      toast.error("Please Your Phoneno",toastoptions);
      return false;
    }
    if(phoneno.length !== 10){
      toast.error("Please Enter a 10 digit phoneno",toastoptions);
      return false;
    }
    if(coverletter === ""){
      toast.error("Please enter Your coverletter",toastoptions);
      return false;
    }
    if(class10percentage === ""|| class12percentage === ""){
      toast.error("Please enter your class10 and class12 percentage",toastoptions);
      return false;
    }
    return true;
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      if(!MakeValidation()){
        return false;
      }
      const formData = new FormData();
      formData.append("name",name);
      formData.append("email",email);
      formData.append("coverletter",coverletter);
      formData.append("address",address);
      formData.append("phoneno",phoneno);
      formData.append("class10percentage",class10percentage);
      formData.append("class12percentage",class12percentage);
      formData.append("resume",resume);
      formData.append("jobID",id);

      console.log(id);

      try{
        const response = await axios.post(applicationpostapi,formData,{
          withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
        });
        if(response && response.data.success){
          console.log("application successfully submitted");
          setTimeout(()=>{
            navigate('/home');
          },2000);
          toast.success("Application Submitted",toastoptions);
          return true;
        }else{
          toast.error("Application not submitted",toastoptions);
          return false;
        }
      }catch(error){
        toast.error("Something went wrong Here",toastoptions);
        return false;
      }
    }catch(error){
      toast.error("Something went wrong in first try block",toastoptions);
      return false;
    }
  }


  return (
    <section className = "applicaton">
      <div className = "container">
        <div className = "header">Application Form</div>
        <form onSubmit={handleSubmit}>
          <input type = "text" 
          placeholder = "Enter Your name" 
          value = {name} 
          onChange={(e)=>setName(e.target.value)}
          />
          <input type = "text" 
          placeholder = "Enter Your Email" 
          value = {email} 
          onChange={(e)=>setEmail(e.target.value)}
          />
          <input type = "text" 
          placeholder = "Enter Your address" 
          value = {address} 
          onChange={(e)=>setAddress(e.target.value)}
          />
          <input type = "text"
          placeholder = "Enter Your phoneno"
          value = {phoneno}
          onChange={(e)=>setPhoneno(e.target.value)}
          />
          <textarea
          placeholder = "CoverLetter"
          value = {coverletter}
          onChange = {(e)=>setCoverletter(e.target.value)}
          />
          <input type = "text"
          placeholder = "Class 10 percentage"
          value = {class10percentage}
          onChange = {(e)=>setClass10percentage(e.target.value)}
          />
          <input type = "text"
          placeholder = "class 12 percentage"
          value = {class12percentage}
          onChange={(e)=>setClass12percentage(e.target.value)}
          />
          <div>
            <label
              style={{ textAlign: "start", display: "block", fontSize: "20px" }}
            >
              Resume
            </label>

            <input type = "file"
            name = "resume"
            onChange = {(e)=>setResume(e.target.files[0])}
            style={{ width: "100%" }}
            />
          </div>
          <button type = "Submit">Submit</button>
        </form>
      </div>
      <ToastContainer/>
    </section>
  )
}

export default Application;