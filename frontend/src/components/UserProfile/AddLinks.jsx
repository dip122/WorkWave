import React, { useState } from 'react'
import axios from 'axios';
import { addlinksapi } from '../../ApiRoutes/api';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import '../../Css/AddLinks.css';
import { useNavigate } from 'react-router-dom';

const AddLinks = () => {

  const [codeforces_profile,setCodeforcesProfile] = useState("");
  const [github_profile,setGithubProfile] = useState("");
  const [leetcode_profile,setLeetCodeProfile] = useState("");
  const [codechef_profile,setCodechefProfile] = useState("");
  const [atcoder_profile,setAtcoderProfile] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('leetcode_profile',leetcode_profile);
      formData.append('github_profile',github_profile);
      formData.append('codeforces_profile',codeforces_profile);
      formData.append('atcoder_profile',atcoder_profile);
      formData.append('codechef_profile',codechef_profile);


      const response = await axios.post(addlinksapi,formData,{
          withCredentials: true,
          headers: {
              "Content-Type": "multipart/form-data",
          },
      });

      if(response && response.data.success) {
        toast.success(response.data.message);
        setTimeout(()=>{
          navigate('/myprofile');
        },3000)
      }else{
        toast.error(response.data.message);
      }
      return true;
    }catch(error){
      console.log(error);
      return false;
    }
  }


  return (
    <div className = "links">
      <div className = "header">Profile Links</div>
      <form onSubmit={handleSubmit}>
        <input type = "text" 
        placeholder = "Update Your Leetcode Profile Link"
        value = {leetcode_profile}
        onChange = {(e)=>setLeetCodeProfile(e.target.value)}
        />
        <input type = "text" 
        placeholder = "Update Your codeforces Profile Link"
        value = {codeforces_profile}
        onChange = {(e)=>setCodeforcesProfile(e.target.value)}
        />
        <input type = "text" 
        placeholder = "Update Your codechef Profile Link"
        value = {codechef_profile}
        onChange = {(e)=>setCodechefProfile(e.target.value)}
        />
        <input type = "text" 
        placeholder = "Update Your github Profile Link"
        value = {github_profile}
        onChange = {(e)=>setGithubProfile(e.target.value)}
        />
        <input type = "text" 
        placeholder = "Update Your atcoder Profile Link"
        value = {atcoder_profile}
        onChange = {(e)=>setAtcoderProfile(e.target.value)}
        />
        <button type = "submit">Save Changes</button>
      </form>
      <ToastContainer/>
    </div>
  )
}

export default AddLinks