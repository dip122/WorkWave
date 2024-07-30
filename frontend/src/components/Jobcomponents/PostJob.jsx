import React, { useState } from 'react'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { jobpostapi } from '../../ApiRoutes/api';
import { useAuth } from '../../Context/usercontext';
import '../../Css/PostJob.css'

const PostJob = () => {

    const [auth,setAuth] = useAuth();
    
    const [title,setTitle] = useState("");
    const [location,setLocation] = useState("");
    const [country,setCountry] = useState("");
    const [city,setCity] = useState("");
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");
    const [salaryfrom,setSalaryFrom] = useState("");
    const [salaryto,setSalaryTo] = useState("");
    const [fixedsalary,setFixedSalary] = useState("");
    const [salaryType,setSalaryType] = useState("default");

    const [skillOptions,setSkillOptions] = useState(['JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'Python', 'Java', 'C++','ML',
    'DL','NLP','CyberSc','AI','Finance','Consultant','Analyst','DSA','OS','CN','DBMS','Graphs','Trees'
     ,'DevOps','Golang']);

    const [skills,setSkills] = useState([]);

    const toastoptions = {
        postion : 'bottom-right',
        autoclose : 8000,
        pauseOnHover : true,
        draggable : true,
    }
    
    //Validation of the job post
    const MakeValidation = ()=>{
        if(title === "" || title.length<5){
            toast.error("Please provide suitable title",toastoptions);
            return false;
        }else if(location === ""){
            toast.error("Please provide the job location",toastoptions);
            return false;
        }else if(city === ""){
            toast.error("Please provide the city",toastoptions);
            return false;
        }else if(category === ""){
            toast.error("Please provide the job role",toastoptions);
            return false;
        }else if(description.length<15){
            toast.error("job description should be clear and more than 15 charecters",toastoptions);
            return false;
        }else if(fixedsalary === "" && salaryfrom === "" && salaryto === ""){
            toast.error("All theree fields cannot be empty",toastoptions);
            return false;
        }else if(fixedsalary === ""){
            if(salaryfrom === "" || salaryto === ""){
                toast.error("Provide the ranged salary",toastoptions);
                return false;
            }
        }else if(fixedsalary !== ""){
            if(salaryfrom !=="" || salaryto!==""){
                toast.error("Provide only the fixed salary",toastoptions);
                return false;
            }
        }else if(salaryType === "default"){
            toast.error("Please first select salary type",toastoptions);
            return false;
        }
        return true;
    }

    const SetSalary = ()=>{
        if(salaryType === "Fixed Salary"){
            setSalaryFrom("");
            setSalaryTo("");
        }else if(salaryType === "Ranged Salary"){
            setFixedSalary("");
        }else{
            setFixedSalary("");
            setSalaryTo("");
            setSalaryFrom("");
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log('clicked');
        if(MakeValidation()){
            console.log('clicked');
            SetSalary();
            try{
                const jobpostedon = new Date();
                const postedBy = auth.user._id;
                const response = await axios.post(jobpostapi,{
                    title,
                    description,
                    category,
                    country,
                    city,
                    location,
                    fixedsalary,
                    salaryfrom,
                    salaryto,
                    jobpostedon,
                    postedBy,
                    skills : skills
                });
                if(response && response.data.success){
                    toast.success("Job posted successfully",toastoptions);
                    console.log(response.data.job);
                }else{
                    console.log(response)
                    toast.error("job is not posted successfully",toastoptions);
                }
            }catch(error){
                toast.error("Something went wrong in server",toastoptions);
                console.log(error);
                return false;
            }
        }
    }

    const handleAddSkills = (skill)=>{
        skills.push(skill);
        setSkills([...skills]);
        setSkillOptions(skillOptions.filter((prevskill)=>prevskill!==skill));
    }
    const handleRemoveSkill = (skill)=>{
        skillOptions.push(skill);
        setSkillOptions([...skillOptions])
        setSkills(skills.filter((prevskill)=>prevskill!==skill));
    }

  return (
    <>
        <div className = "job_post page">
            <div className = "container">
                <div className = "header">Post New Jobs</div>
                <form onSubmit = {handleSubmit}>
                        <div className = "wrapper">
                            <input type = "text" placeholder = "Please input the title of job" value ={title} onChange = {(e)=>setTitle(e.target.value)}/>
                            <select value = {category} onChange={(e)=>setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="Graphics & Design">Graphics & Design</option>
                                <option value="Software Development">
                                SoftWare Development
                                </option>
                                <option value="Frontend Web Development">
                                Frontend Web Development
                                </option>
                                <option value="Full Stack Development">
                                Full Stack development
                                </option>
                                <option value="Data Analyst">Analyst</option>
                                <option value="Artificial Intelligence">
                                Artificial Intelligence
                                </option>
                                <option value="Mechine Learning Engineer">ML Engineer</option>
                                <option value="Backend Development">
                                Backend Development
                                </option>
                                <option value="React Development">
                                React Development
                                </option>
                                <option value="Data Entry Operator">Data Entry Operator</option>
                            </select>
                        </div>
                        <div className = "wrapper">
                            <input type = "text" value = {country} onChange = {(e)=>setCountry(e.target.value)} placeholder = "country name"/>
                            <input type = "text" value = {city} onChange = {(e)=>setCity(e.target.value)} placeholder = "city name"/>
                        </div>
                        <div className = "wrapper">
                            <input type="text" value = {location} onChange = {(e)=>setLocation(e.target.value)} placeholder = "location"/>
                        </div>
                        <div className = "salary_wrapper">
                            <select value = {salaryType} onChange = {(e)=>setSalaryType(e.target.value)}>
                                <option value = "default">Select Salary Type</option>
                                <option value = "Fixed Salary">Fixed Salary</option>
                                <option value = "Ranged Salary">Ranged Salary</option>
                            </select>
                            <div className = "salary_class">
                                {salaryType === "default" ? (
                                    <div className = "provide_salary">Please provide Salary of the current job</div>
                                ) : salaryType === "Fixed Salary" ? (
                                    <input type="text" value = {fixedsalary} onChange={(e)=>setFixedSalary(e.target.value)} placeholder="enter Your fixed salary"/>
                                ) : (
                                    <div className = "ranged_salary">
                                        <input type="text" value = {salaryfrom} onChange={(e)=>setSalaryFrom(e.target.value)} placeholder="Salary From"/>
                                        <input type="text" value={salaryto} onChange={(e)=>setSalaryTo(e.target.value)} placeholder='Salary to'/>
                                    </div>
                                )}


                            </div>
                        </div>
                        <textarea rows = "10" value = {description} onChange={(e)=>setDescription(e.target.value)} placeholder = "Describe Your Job"/>
                        <div className = "skills">
                            <div className = "first-para">
                                <div className = "title1">Avaiable Skills</div>
                                {skillOptions.map((skill)=>{
                                    return (
                                        <div className = "job-div" key={skill}><button onClick={()=>handleAddSkills(skill)}>{skill}</button></div>
                                    )
                                })}
                            </div>
                            <div className = "second-para">
                                <div className = "title2">Added Skills</div>
                                {skills.map((skill)=>{
                                    return (
                                        <div className = "job-div" key={skill}><button onClick = {()=>handleRemoveSkill(skill)}>{skill}</button></div>
                                    )
                                })}
                            </div>
                        </div>
                        <div className="button-class">
                            <button type = "submit" onClick={()=>handleSubmit}>Post Job</button>
                        </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    </>
  )
}

export default PostJob