import React from 'react'
import axios from 'axios'
import '../../Css/SeekerCard.css';


const JobSeekerCard = ({element,DeleteApplication}) => {

  const handleClick = ()=>{
        console.log('clicked');
  }

  return (
    <div className = "jobseekercard">
        <div className = "container">
            <div className = "p">
                <span>Name</span>: {element.name}
            </div>
            <div className = "p">
                <span>Email</span> : {element.email}
            </div>
            <div className = "p">
                <span>Phoneno</span> : {element.phoneno}
            </div>
            <div className = "p">
                <span>Address</span> : {element.address}
            </div>
            <div className = "p">
                <span>CoverLetter</span> : {element.coverletter}
            </div>
            <div className = "p">
                <span>X %</span> : {element.class10percentage}
            </div>
            <div className = "p">
                <span>XII %</span> : {element.class12percentage}
            </div>
            <div className = "p">
                <span>Address</span> : {element.address}
            </div>
            <div className = "p">
                <span>Role</span> : {element.role}
            </div>
        </div>
        <div className = "resume">
                <img src = {element.resume.url}
                alt = "resume"
                onClick = {handleClick}
                />
        </div>
        <div className = "deleteappplication-button">
                <button onClick={()=>DeleteApplication(element._id)}>Delete</button>
        </div>
    </div>
  )
}

export default JobSeekerCard