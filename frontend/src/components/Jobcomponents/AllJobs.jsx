import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { getalljobsapi, getallmypostedjob } from '../../ApiRoutes/api';
import { useAuth } from '../../Context/usercontext';
import '../../Css/AllJobs.css'

const AllJobs = () => {

    const [jobs,setJobs] = useState([]);
     const [auth,setAuth] = useAuth();
    
    useEffect(()=>{
        const getalljobs = async()=>{
            try{
                const response = await axios.get("http://localhost:4600/api/v1/job/getalljobs");
                if(response && response.data.success){
                    setJobs(response.data.jobs);
                    console.log("all jobs received successfully");
                }else{
                    setJobs([]);
                    console.log("No jobs are there in database");
                }
            }catch(error){
                console.log("Client side error");
                console.log(error);
            }
        }

        getalljobs();
    },[])
  return (
    <>
        <div className = "jobs page">
            <div className = "container">
                <div className = "header">Available Jobs</div>
                <div className = "header-description">Below you can find Jobs, Look at the jobs at can suit your skills and hit the apply button
                .Once you have applied for a job , you will not be able to apply for that job again. Your application will be sent to the respective
                HR or Talent aquisition team. Where they will see your application and will sent mail according to their requirement. Stay happy 
                and sterve your dream job here!</div>
                <div className = "jobbanner">
                    {jobs && jobs.map((ele)=>{
                        return (
                            <div className = "card" key = {ele._id}>
                                <div className = "firstp">{ele.title}</div>
                                <div className = "secondp">{ele.category}</div>
                                <div className = "thirdp">{ele.country}</div>
                                <a href= {`/singlejob/${ele._id}`}>Job Details</a>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </>
  )
}

export default AllJobs