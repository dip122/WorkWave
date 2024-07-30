import React from 'react'
import '../../Css/SeekerCard.css'

const EmployeeCard = ({element}) => {

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
        </div>
        <div className = "resume">
                <img src = {element.resume.url}
                alt = "resume"
                className = "mr-30"
                onClick = {handleClick}
                />
        </div>
    </div>
    
  )
}

export default EmployeeCard