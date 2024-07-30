import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { deleteapplicationbyjobid, deletejobapi, getalljobsapi, getallmypostedjob } from '../../ApiRoutes/api';
import { useAuth } from '../../Context/usercontext';
import '../../Css/AllJobs.css'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AllJobs = () => {

    const [jobs,setJobs] = useState([]);
    const [auth,setAuth] = useAuth();

    const navigate = useNavigate();
    
    useEffect(()=>{
        const getmypostedjobs = async()=>{
            try{
                const response = await axios.get(getallmypostedjob);
                if(response && response.data.success){
                    setJobs(response.data.alljobs);
                }else{
                    setJobs([]);
                }
            }catch(error){
                console.log(error);
                setJobs([]);
            }
        }
        getmypostedjobs();
    },[auth?.user?.role === 'employer'])

    const DeleteJob = async(id)=>{
        try{
            const response = await axios.delete(deletejobapi + id);
            if(response && response.data.success){
                toast.success('All jobs deleted successfully');
                setJobs(jobs.filter((job)=>job._id!== response.data.deletedjob._id ))
            }else{
                toast.error('job not deleted');
            }
        }catch(error){
            console.log(error);
            toast.error('something went wrong in case of server');
        }
    }

    const deleteApplications = async(id)=>{
        try{
            console.log(id);
            const response = await axios.delete(deleteapplicationbyjobid + id);
            if(response && response.data.success){
                console.log(response.data);
            }else{
                console.log('applciations not deleted');
            }
        }catch(error){
            console.log(error);
        }
    }

    const handleFunction = async(id) =>{
        await deleteApplications(id);
        await DeleteJob(id);
    }

  return (
    <>
        <div className = "jobs page">
            <div className = "container">
                <div className = "header">My Jobs</div>
                <div className = "header-description" style = {{textAlign : "center"}}>You can update your jobs and Delete jobs jobs is needed</div>
                <div className = "jobbanner">
                    {jobs && jobs.map((ele)=>{
                        return (
                            <div className = "card" key = {ele._id}>
                                <div className = "firstp">{ele.title}</div>
                                <div className = "secondp">{ele.category}</div>
                                <div className = "thirdp">{ele.country}</div>
                                <a href= {`/singlejob/${ele._id}`}>Job Details</a>
                                <a onClick= {()=>handleFunction(ele._id)}>Delete Job</a>
                            </div>
                        );
                    })}
                </div>
            </div>
            <ToastContainer/>
        </div>
    </>
  )
}

export default AllJobs