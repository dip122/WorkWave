import React, { useEffect, useState } from 'react'
import '../../Css/SingleProfile.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getprofilebyid, getprofilebyuserid } from '../../ApiRoutes/api';
import { useAuth } from '../../Context/usercontext';
import Spinner from '../Spinner/Spinner';

const CurrentUserProfile = () => {

  const [element,setElement] = useState([]);
  const [ok,setOk] = useState(false)
  const [auth,setAuth] = useAuth();
  const {id} = useParams();
  
  useEffect(()=>{
    const getProfile = async()=>{
      try{
        const url = getprofilebyuserid;
        const response = await axios.get(url);
        if(response && response.data.success){
          setElement(response.data.profile);
          console.log(response);
          setOk(true);
        }else{
          setElement([]);
          setOk(false);
        }
      }catch(error){
        console.log(error);
        setElement([]);
        setOk(false);
      }
    }

    getProfile();
  },[])
  return (
    <> { ok ? (
      <div className = "single-profile">
      <div className = "header">My Profile</div>
      <div className = "section">
        <div className = "img-class"><img src={element?.profile_pic.url} alt = "image"/></div>
        <div className = "section-right">
          <p>Name : <span>{element?.name}</span></p>
          <p>Email : <span>{element?.email}</span></p>
          <p>Contact : <span>{element?.contact}</span></p>
          <p>Higher EDU : <span> {element?.institution}</span></p>
          <p>Leetcode : <span> <a href={element?.leetcode_profile}>Leetcode</a></span></p>
          <p>Codeforces : <span> <a href={element?.codeforces_profile}>Codeforces</a></span></p>
          <p>Codechef  : <span> <a href={element?.codechef_profile}>Codechef</a></span></p>
          <p>Atcoder : <span> <a href={element?.atcoder_profile}>AtCoder</a></span></p>
          <p>Github : <span> <a href={element?.github_profile}>Github</a></span></p>
          <p>YrOfExp : <span> {element?.yrofexp}</span></p>
          <p>Passout Year : <span> {element?.passoutyear}</span></p>
        </div>
      </div>
      <div className = "resume-section">
        <div className ="resume-label">Resume</div>
        <img src={element?.resume?.url} alt = "images"/>
      </div>
    </div>
    ) : (<Spinner/>)} 
    </>
  )
}

export default CurrentUserProfile