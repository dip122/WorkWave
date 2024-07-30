import React from 'react'
import { useNavigate } from 'react-router-dom';
import '../../Css/Error404.css'

const Error404 = () => {

    const navigate = useNavigate();

    const clickhandler = ()=>{
        navigate('/home');
        console.log('clicked');
    }

  return (
    <>
        <div className = "page-not-found">
            <div className = "content">
                <img src = "/images/404notfound.png"/>
                <button onClick={clickhandler}>Return to Home Page</button>
            </div>
        </div>
    </>
  )
}

export default Error404