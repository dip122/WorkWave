import React, { useState } from 'react'
import '../../Css/Account.css';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { postuserprofileapi } from '../../ApiRoutes/api';
import { useAuth } from '../../Context/usercontext';


const Account = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [address,setAddress] = useState("");
    const [contact,setContact] = useState("");
    const [institution,setinstitution] = useState("");
    const [leetcode_profile,setLeetcodeProfile] = useState("");
    const [passoutyear,setPassoutYear] = useState("");
    const [yrofexp,setYrofExp] = useState("");
    const [resume,setResume] = useState(null);
    const [profile,setProfile] = useState(null);

    const [auth,setAuth] = useAuth();

    const handleSubmit = async(e)=> {
        e.preventDefault();
        if(auth?.user?.role !== 'job seeker'){
            console.log('Not logged in');
            console.log(auth.user);
            return false;
        }
        try{
            const formData = new FormData();
            formData.append('name',name);
            formData.append('email',email);
            formData.append('contact',contact);
            formData.append('address',address);
            formData.append('institution',institution);
            formData.append('passoutyear',passoutyear);
            formData.append('yrofexp',yrofexp);
            formData.append('resume',resume);
            formData.append('profile_pic',profile);

            const response = await axios.post(postuserprofileapi,formData,{
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if(response && response.data.success){
                toast.success('application submitted successfully');
            }else{
                toast.error('application not submitted');
            }
            return true;
        }catch(error){
            console.log(error);
            toast.error('catch block');
        }
    }

    


  return (
    <div className = "account">
        <div className = "header">Fill All the fields below To make Update</div>
        <form onSubmit = {handleSubmit}>
            <input type = "text" placeholder = "Enter Your name" 
            value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type = "text" placeholder = "Enter Your email" 
            value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type = "text" placeholder = "Enter Your contact" 
            value={contact} onChange={(e)=>setContact(e.target.value)}/>
            <input type = "text" placeholder = "Enter Your address" 
            value={address} onChange={(e)=>setAddress(e.target.value)}/>
            <input type = "text" placeholder = "Enter Your institution" 
            value={institution} onChange={(e)=>setinstitution(e.target.value)}/>
            <input type = "text" placeholder = "passout year"
            value={passoutyear} onChange={(e)=>setPassoutYear(e.target.value)}/>
            <input type = "text" placeholder = "Year of Exp"
            value={yrofexp} onChange={(e)=>setYrofExp(e.target.value)}/>
            <label>Resume</label>
            <input type = "file"
                name = "resume"
                onChange = {(e)=>setResume(e.target.files[0])}
                style={{ width: "100%" }}
            />
            <label>Profile</label>
            <input type = "file"
                name = "profile_pic"
                onChange = {(e)=>setProfile(e.target.files[0])}
                style={{ width: "100%" }}
            />
            <button type = "submit">Submit</button>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Account