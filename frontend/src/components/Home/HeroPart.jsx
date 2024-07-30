import React from 'react'
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import '../../Css/Home.css'

const HeroPart = () => {

    const element = [
        {
            id : 1,
            number : "2,34,556",
            role : "Current Jobs",
            icon: <FaSuitcase />,
        },
        {
            id : 2,
            number : "60789",
            role : 'companies',
            icon: <FaBuilding />,
        },
        {
            id : 3,
            number : "5,30,256",
            role : 'job seekers',
            icon: <FaUsers />,
        },
        {
            id : 4,
            number : '43,000',
            role : 'employer',
            icon: <FaUserPlus />,
        }
    ]
  return (
    <>
        <div className = "herosection">
            <div className = "container">
                <div className = "image">
                    <img src= "/images/image5.jpg" alt="Image Not found"/>
                </div>
                <div className = "title">
                    <div className = "h1">Find Your Jobs</div>
                    <div className = "h1 h1-last">Fill your suitable skills</div>
                    <p>Welcome to JobHive, Here you can find many jobs and you can apply to 
                        those jobs accordingly to your suitable skills, Here Some jobs will also be 
                        recomanded to you by our website based on your skills and job description
                    </p>
                </div>
            </div>

            <div className = "about-hero">
                {element.map((ele)=>{
                    return (  
                        <div className = "card" key = {ele.id}>
                            <div className = "icon">{ele.icon}</div>
                            <div className = "content-card">
                                <p>{ele.number}</p>
                                <p>{ele.role}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </>
  )
}

export default HeroPart