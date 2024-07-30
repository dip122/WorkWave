import React from 'react'
import { FaReact } from "react-icons/fa";
import '../../Css/JobCategories.css'

const JobCategories = () => {


    const element = [
        {
            icon : <FaReact/>,
            id : 1,
            name : "Artificical Intelligence",
            subname : "100 open positions",
        },
        {
            icon : <FaReact/>,
            id : 2,
            name : "Full Stack Development",
            subname : "200 open positions",
        },
        {
            icon : <FaReact/>,
            id : 3,
            name : "Software Engeneering",
            subname : "205 open positions"
        },
        {
            icon : <FaReact/>,
            id : 4,
            name : "Data Analysis",
            subname : "300 open positions"
        },
        {
            icon : <FaReact/>,
            id : 5,
            name : "ML engeneer",
            subname : "278 open positions",
        },
        {
            icon : <FaReact/>,
            id : 6,
            name : "Programme Associates",
            subname : "103 open positions"
        },
        {
            icon : <FaReact/>,
            id : 7,
            name : "Technology consultant",
            subname : "305 open positions",
        },
        {
            icon : <FaReact/>,
            id : 8,
            name : "HardWare Engineer",
            subname : "307 open positions"
        }
    ]
  return (
    <>
        <div className = "jobtypes">
            <div className = "popularjobtypes">Popular Job Types</div>
            <div className = "banner">
                {element.map((ele)=>{
                    return (
                        <div className = "card" key={ele.id}>
                            <div className = "icon">{ele.icon}</div>
                            <div className = "texts">
                                <div className = "firstp">{ele.name}</div>
                                <div className = "secondp">{ele.subname}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </>
  )
}

export default JobCategories