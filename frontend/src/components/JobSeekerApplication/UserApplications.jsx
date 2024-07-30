import React, { useState } from 'react'
import { useAuth } from '../../Context/usercontext'
import { useEffect } from 'react';
import axios from 'axios';
import { getallapplicationapi, getapplicationapi } from '../../ApiRoutes/api';
import { deleteapplicationapi } from '../../ApiRoutes/api';
import JobSeekerCard from './JobSeekerCard';
import EmployeeCard from './EmployeeCard';
import '../../Css/UserApplication.css';
import Header from '../Layout/Header';

const UserApplications = () => {

    const [auth,setAuth] = useAuth();
    const [applications,setApplications] = useState([]);


    useEffect(()=>{
        const GetApplicationsUser = async()=>{
            try{
                const response = await axios.get(getapplicationapi);
                if(response && response.data.success){
                    console.log("successfully we have all the application of the current user");
                    setApplications(response.data.gethisapplication);
                }else{
                    console.log("Something went wrong");
                    setApplications([]);
                }
            }catch(error){
                console.log("Something went wrong in case of api call");
                console.log(error);
            }
        }

        const Getallapplication = async()=>{//for employer
            try{
                const response = await axios.get(getallapplicationapi);
                if(response && response.data.success){
                    console.log("ALL application for the employer is received");
                    setApplications(response.data.getallusers);
                }else{
                    console.log('Something went wrong');
                    setApplications([]);
                }
            }catch(error){
                console.log(error);
            }
        }

        if(auth?.user?.role === "job seeker"){
            console.log("YES Job seeker");
            GetApplicationsUser();
        }else if(auth?.user?.role === "employer"){
            console.log("YES EMPLOYER");
            Getallapplication();
        }
    },[auth && auth?.user]);

    const DeleteApplication = async (id) => {
        try {
            const response = await axios.delete(`${deleteapplicationapi}${id}`);
            if (response && response.data.success) {
                console.log('Successfully deleted the application');
                setApplications((prev) => prev.filter((application) => application._id !== id));
            } else {
                console.log('Application not deleted');
            }
        } catch (error) {
            console.log(error);
        }
    };


  return (
    <>
    <Header/>
    <section className = "userapplication">
        {auth && auth?.user?.role === 'job seeker' ? (
            <div className = "container">
                <div className = "h1">{`${(auth && auth?.user?.role === 'job seeker') ? 'My Applications': 'Applications'}`}</div>
                {applications.length <=0 ? (
                    <>
                        <h3>No Applications Found</h3>
                    </>
                ):(
                    applications.map((application)=>{
                        return (
                            <JobSeekerCard
                            element = {application}
                            key = {application._id}
                            DeleteApplication = {DeleteApplication}
                            />
                        )
                    })
                )}
            </div>
        ) : (
            <div className = "container">
                <div className = "h1">All Job Applications</div>
                {applications.length <=0 ? (
                    <>
                        <h3>No Applications Found</h3>
                    </>
                ):(
                    applications.map((application)=>{
                        return (
                            <EmployeeCard
                            element = {application}
                            key = {application._id}
                            />
                        )
                    })
                )}
            </div>
          )}
       </section>
    </>
  )
}


export default UserApplications