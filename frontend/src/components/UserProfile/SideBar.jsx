import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Account from './Account';
import Password from './Password';
import AddSkills from './AddSkills';
import AddLinks from './AddLinks';
import '../../Css/SideBar.css'
import { useAuth } from '../../Context/usercontext';

const Sidebar = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const navigate = useNavigate();
    const [currentview,setCurrentView] = useState('account');
    const [auth,setAuth] = useAuth();

    const menu = {
        account : <Account/>,
        password : <Password/>,
        addskills : <AddSkills/>,
        links : <AddLinks/>
    }

    const ReturnToHome = ()=>{
        navigate('/home');
    }
    return (
        <div className="container-sidebar">
           <div className = "sidebar">
                <div className = "header">
                    <div className = "image-sidebar"><img src = "/images/image5.jpg"/></div>
                    <div className = "name">Dipayan</div>
                </div>
                <div className = "others">
                    <div className = "Lists" onClick={()=>setCurrentView('account')}>Account Set</div>
                    <div className = "Lists" onClick={()=>setCurrentView('password')}>password</div>
                    <div className = "Lists" onClick={()=>setCurrentView('links')}>Links</div>
                    <div className = "Lists" onClick={()=>setCurrentView('addskills')}>AddSkills</div>
                    <div className = "Lists" onClick={()=>navigate(`/user-profile`)}>MyProfile</div>
                    <div className = "Lists" onClick={ReturnToHome}>Return Home</div>
                </div>
           </div>
           <div className = "content">
             {menu[currentview]}
           </div>
        </div>
    );
};

export default Sidebar;