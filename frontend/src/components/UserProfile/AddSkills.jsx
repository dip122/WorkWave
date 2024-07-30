import React, { useEffect, useState } from 'react'
import '../../Css/AddSkills.css';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { addskillapi, getuserprofapi } from '../../ApiRoutes/api';
import { useAuth } from '../../Context/usercontext';

const AddSkills = () => {

  const [skills,setSkills] = useState([]);
  const [skillOptions,setSkillOptions] = useState(['JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'Python', 'Java', 'C++','ML',
  'DL','NLP','Cybersecurity','AI','Finance','Consultant','Analyst','DSA','OS','CN','DBMS','Graphs','Trees'
   ,'Combinatorics','Golang']);

  const [auth,setAuth] = useAuth();

  const handleAddSkills = (skill)=>{
    if(!skills.includes(skill)){
      setSkills([...skills,skill]);
      setSkillOptions(skillOptions.filter(Option=> Option!==skill));
    }else{
      setSkillOptions(skillOptions.filter(Option=> Option!==skill));
    }
  }

  const handleRemoveSkill = (skill) =>{
    if(!skillOptions.includes(skill)){
      setSkillOptions([...skillOptions,skill]);
      setSkills(skills.filter(option => option!==skill));
    }else{
      setSkills(skills.filter(option => option!==skill));
    }
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('skills',skills);
      console.log(skills);
      const response = await axios.post(addskillapi,formData,{
        withCredentials: true,
        headers: {
            "Content-Type": "multipart/form-data",
        },
      });
      if(response && response.data.success){
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }
      return true;
    }catch(error){
      toast.error('Error in Server side');
      return false;
    }
  }

  useEffect(()=>{
    const isProfileSet = async()=>{
      try{
        const response = await axios.get(getuserprofapi);
        if(response && response.data.success){
          const arr = response.data.skillsArray;
        //  console.log(arr.length);
          let array = [];
          let optionskill = skillOptions;
          for(let i=0;i<arr.length;i++){
            if(optionskill.includes(arr[i])){
              let index = optionskill.indexOf(arr[i]);
              if(index!==-1){
                optionskill.splice(index,1);
              }
            }
            array.push(arr[i]);
          }
          await setSkillOptions(optionskill);
          await setSkills(array);
        }
      }catch(error){
        console.log(error);
      }
    }

    isProfileSet();
  },[auth?.user?.role === 'job seeker'])


  return (
    <div className = "addskills">
        <div className = "header">Update Yours Skills Here ( Click Here To Add to Your Skill )</div>
        <div className = "skills-options">
            {skillOptions.map((skill,index)=>{
              return (
                  <button key={index} onClick={()=>handleAddSkills(skill)}>
                      {skill}
                  </button>
              )
            })}
        </div>
        <div className = "myskills">
          <div className = "header">My Skills ( Click on Skill to remove from your skill )</div>
          <div className = "skills-options">
            {skills.map((skill,index)=>{
                return (
                    <button key={index} onClick={()=>handleRemoveSkill(skill)}>
                        {skill}
                    </button>
                )
              })}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <button type = "submit">Submit Skill</button>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default AddSkills