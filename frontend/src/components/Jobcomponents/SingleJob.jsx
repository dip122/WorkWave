import React, { useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/usercontext';
import axios from 'axios';
import { useEffect } from 'react';
import { alreadyappliedapplication, jobbyidapi } from '../../ApiRoutes/api';
import '../../Css/SingleJob.css';


const SingleJob = () => {
    
    const params = useParams();
    const id = params.id;//id of the single job
    const [auth,setAuth] = useAuth();
    const [singlejob,setSingleJob] = useState([]);
    const [skills,setSkills] = useState([]);
    const [ok,setOk] = useState(false);
    const navigate = useNavigate();
    
    useEffect(()=>{
        const JobDetails = async()=>{
            try{
                //console.log(singlejob);
                const response = await axios.get(jobbyidapi + id);
                if(response && response.data.success){
                    setSingleJob(response.data.job);
                    setSkills(response.data.job.skills);
                    console.log(skills.length);
                }else{
                    setSingleJob([]);
                    console.log("Job Description not correctly retrieved");
                    setSkills([]);
                }
            }catch(error){
                setSkills([]);
                console.log(error);
            }
        }
        JobDetails();

        const HasAlreadyApplied = async()=>{
            try{
                const response = await axios.get(alreadyappliedapplication + `/${id}`);

                if(response && response.data.success){
                    setOk(true);
                }else{
                    console.log("Response not get");
                    setOk(false);
                }
            }catch(error){
                console.log(error);
                setOk(false);
            }
        }

        if(auth?.user?.role === 'job seeker')HasAlreadyApplied();
        console.log(ok);


        
    },[auth?.user?.role !== ""]);

    const handleClick = (id)=>{
        console.log('clicked');
        navigate(`/application/${id}`)
    }

  return (
    <div className = "singlejob page">
        <div className = "container">
            <div className = "header">Job Description : JD</div>
            <div className = "jobbanner">
                <div>Title : <span>{singlejob.title}</span></div>
                <div>Category : <span>{singlejob.category}</span></div>
                <div>Country : <span>{singlejob.country}</span></div>
                <div>City : <span>{singlejob.city}</span></div>
                <div>Location : <span>{singlejob.location}</span></div>
                <div>Description : <span>{singlejob.description}</span></div>
                <div>Application open date : <span>{singlejob.jobpostedon}</span></div>
                <div>Salary : {
                    singlejob.fixedsalary !== "" ? <span>{singlejob.fixedsalary}</span> : 
                    <span>{singlejob.salaryfrom} - {singlejob.salaryto}</span>
                    }
                </div>
                <div>Skills : 
                    {skills.length>0 && skills.map((skill)=>{
                        return (
                            <span key={skill}>{skill} ,</span>
                        )
                    })}
                </div>
                <div className ="button-class">
                    <div>{auth && auth.user && auth.user.role === "job seeker" ? 
                    ( ok ? <button>Already Applied</button> : 
                    <button onClick={()=>handleClick(singlejob._id)}>Apply</button> ):
                     <></>}</div>
                     <div>
                        {auth && auth.user && auth.user.role === 'employer' && singlejob.postedBy === auth.user._id ? (
                            <button onClick = {()=>navigate(`/update-job/${singlejob._id}`)}>Update Job</button>
                        ) : (
                            <></>
                        )}
                     </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SingleJob