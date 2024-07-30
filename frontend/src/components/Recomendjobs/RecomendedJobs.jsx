import React, { useEffect, useState } from 'react'
import { recomendedjobapi } from '../../ApiRoutes/api'
import axios from 'axios';
import { useAuth } from '../../Context/usercontext';

const RecomendedJobs = () => {

    const [jobs,setJobs] = useState([]);
    const [auth,setAuth] = useAuth();
    const [hasprofileset,ishasprofileset] = useState(true);

    useEffect(()=>{
        const recomendedjobs = async()=>{
            try{
                const response = await axios.get(recomendedjobapi);
                if(response && response.data.success){
                    setJobs(response.data.jobs);
                    console.log(response.data.jobs);
                    ishasprofileset(true);
                }else{
                    if(response && response.data.success === false){
                        if(response.data.message === 'Profile Not set'){
                            ishasprofileset(false);
                        }
                    }
                    console.log('jobs not get');
                }
            }catch(error){
                console.log(error);
            }
        }
        recomendedjobs();
    },[auth?.user])
  return (
    <>
        <div className = "jobs page">
            <div className = "container">
                <div className = "header">RecomendedJobs</div>
                <div className = "header-description">Below you can find Jobs, Look at the jobs at can suit your skills and hit the apply button
                .Once you have applied for a job , you will not be able to apply for that job again. Your application will be sent to the respective
                HR or Talent aquisition team. Where they will see your application and will sent mail according to their requirement. Stay happy 
                and sterve your dream job here!</div>
                <div className = "jobbanner">
                    {jobs && jobs.length>0 && jobs.map((jobwrapper,index)=>{
                        const job = jobwrapper.job
                        return (
                            <div className = "card" key = {index}>
                                <div className = "firstp">{job?.title}</div>
                                <div className = "secondp">{job?.category}</div>
                                <div className = "thirdp">{job?.country}</div>
                                <a href= {`/singlejob/${job?._id}`}>Job Details</a>
                            </div>
                        );
                    })}
                </div>
                <div className = {`${hasprofileset ? 'hidden' : 'block'} flex justify-center items-center text-center text-3xl font-semibold p-3`}>Please set Your Profile First</div>
            </div>
        </div>
    </>

  )
}

export default RecomendedJobs