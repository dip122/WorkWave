import React from 'react'
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import '../../Css/services.css';

const Services = () => {
  return (
    <>
        <div className = "services">
            <div className = "container">
                <div className = "details">JobHive Services</div>
                <div className = "banner">
                    <div className = "card">
                        <FaUserPlus/>
                        <p className = "firstp">Create Account</p>
                        <p className = "secondp">First create Your Account then Look For Your dream job.Here you can
                        set your own profile which can be viewed by multiple employer registerd in jobHive</p>
                    </div>
                    <div className = "card">
                        <MdFindInPage/>
                        <p className = "firstp">Find/Post a job</p>
                        <p className = "secondp"> First create Your Account then Find Your suitable job or post 
                        your job if you are an employer and your team has vacancies in your company</p>
                    </div>
                    <div className = "card">
                        <IoMdSend/>
                        <p className = "firstp">Apply for suitable Job</p>
                        <p className = "secondp">First create Your Account then apply for your suitable job 
                        or you can review a application if you are employer in your companies and your team has 
                        vacancies.You can get the userprofile also</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Services