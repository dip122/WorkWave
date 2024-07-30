import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jobbyidapi, updatejobapi } from '../../ApiRoutes/api';
import { useAuth } from '../../Context/usercontext';
import { useParams } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../Css/UpdatedJob.css';

const UpdateJob = () => {
  const [job, setJob] = useState(null); // Change to a single job object
  const [auth] = useAuth();
  const [editingMode, setEditingMode] = useState(false);
  const params = useParams();
  const id = params.id;
  const [skills,setSkills] = useState([]);

  const [skillOptions,setSkillOptions] = useState(['JavaScript', 'React', 'Node.js', 'CSS', 'HTML', 'Python', 'Java', 'C++','ML',
  'DL','NLP','CyberSc','AI','Finance','Consultant','Analyst','DSA','OS','CN','DBMS','Graphs','Trees'
   ,'DevOps','Golang']);

  useEffect(() => {
    const jobDetails = async () => {
      try {
        const response = await axios.get(jobbyidapi + id);
        if (response && response.data.success) {
          setJob(response.data.job);
          const arr = response.data.job.skills;
          let ans = [];
          for(let i=0;i<arr.length;i++){
            let s = arr[i];
            let f =  1;
            for(let j=0;j<skills.length;j++){
              if(skills[j] === s){
                f = 0;
                break;
              }
            }
            if(f === 1)ans.push(s);
          }
          //console.log('skills are' + ans);
          setSkills(ans);
        } else {
          setJob(null);
        }
      } catch (error) {
        console.log(error);
        setJob(null);
      }
    };

    jobDetails();
  }, [auth?.user?.role, id]);

  const handleInputChange = (field, value) => {
    setJob((prevJob) => ({ ...prevJob, [field]: value }));
  };

  const handleClick = async () => {
    console.log('clicked');
    try {
      const response = await axios.put(updatejobapi + id, {
        title: job.title,
        category: job.category,
        country: job.country,
        city: job.city,
        location: job.location,
        description: job.description,
        jobpostedon: job.jobpostedon,
        fixedsalary: job.fixedsalary,
        skills : skills
      });
      if (response && response.data.success) {
        toast.success('Successfully updated');
      } else {
        toast.error('Not Updated');
      }
    } catch (error) {
      console.log(error);
      toast.error('Some error in server side');
    }
  };

  const handleAddSkills = (skill)=>{
    setSkills([...skills,skill]);
    setSkillOptions(skillOptions.filter((prevskill)=>prevskill!==skill));
  }
  
  const handleRemoveSkills = (skill)=>{
    setSkillOptions([...skillOptions,skill]);
    setSkills(skills.filter((prevskill)=>prevskill!==skill));
  }

  return (
    <div className="updated-jobs">
      <div className="container">
        <div className="header">JD : Job Description</div>
        {job ? (
          <div className="banner">
            <div className="title">
              <span>Title</span>
              <input
                type="text"
                value={job.title}
                disabled={!editingMode}
                onChange={(e) => {
                  handleInputChange('title', e.target.value);
                }}
              />
            </div>
            <div className="title">
              <span>Category</span>
              <input
                type="text"
                value={job.category}
                disabled={editingMode === false}
                onChange={(e) => {
                  handleInputChange('category', e.target.value);
                }}
              />
            </div>
            <div className="title">
              <span>Country</span>
              <input
                type="text"
                value={job.country}
                disabled={!editingMode}
                onChange={(e) => {
                  handleInputChange('country', e.target.value);
                }}
              />
            </div>
            <div className="title">
              <span>City</span>
              <input
                type="text"
                value={job.city}
                disabled={!editingMode}
                onChange={(e) => {
                  handleInputChange('city', e.target.value);
                }}
              />
            </div>
            <div className="title">
              <span>Location</span>
              <input
                type="text"
                value={job.location}
                disabled={!editingMode}
                onChange={(e) => {
                  handleInputChange('location', e.target.value);
                }}
              />
            </div>
            <div className="title">
              <span>Description</span>
              <textarea
                type="text"
                value={job.description}
                rows="7"
                disabled={!editingMode}
                onChange={(e) => {
                  handleInputChange('description', e.target.value);
                }}
              />
            </div>
            <div className="title">
              <span>Application Open Date</span>
              <input
                type="text"
                value={job.jobpostedon}
                disabled={!editingMode}
                onChange={(e) => {
                  handleInputChange('jobpostedon', e.target.value);
                }}
              />
            </div>
            <div className="title">
              <span>Salary</span>
              <input
                type="text"
                value={job.fixedsalary}
                disabled={!editingMode}
                onChange={(e) => {
                  handleInputChange('fixedsalary', e.target.value);
                }}
              />
            </div>
            <div className = "skills">
              <div className = "first-para">
                <div className = "title1">Avaiable</div>
                  {skillOptions.map((skill)=>{
                    return (
                      <div className = "job-div" key = {skill}><button onClick={()=>(handleAddSkills(skill))}>{skill}</button></div>
                    )
                  })}
              </div>
              <div className = "second-para">
                <div className = "title1">Avaiable</div>
                {skills.map((skill)=>{
                  return (
                    <div className = "job-div" key = {skill}><button onClick = {()=>handleRemoveSkills(skill)}>{skill}</button></div>
                  )
                })}
              </div>
            </div>
            <div className="button-cl">
              <button onClick={() => setEditingMode(!editingMode)}>
                {editingMode ? 'Save' : 'Edit'}
              </button>
              {editingMode && (
                <button onClick={handleClick}>Save Changes</button>
              )}
            </div>
            
          </div>
        ) : (
          <Spinner />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateJob;
