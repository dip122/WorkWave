import React, { useState } from 'react'
import { useAuth } from '../../Context/usercontext'
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const Header = () => {

  const [auth,setAuth] = useAuth();
  const [isopen,setisopen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = ()=>{
    setisopen(!isopen);
  }

  const Logout = async()=>{
    console.log('yes logged out is called usccessfully');
    const data = await localStorage.getItem('auth');
    if(data){
      console.log(data);
      await localStorage.removeItem('auth');
      navigate('/');
      window.location.reload();
    }
  }



  return (
    <section className = "bg-white text-3xl py-5">
      <nav className = "flex justify-between items-center mx-auto w-[92%]">
        <div className = "w-48 h-10 overflow-y-hidden">
          <div className = "cursor-pointer font-semibold hover:text-gray-500 h-11">WorkWave</div>
        </div>
        <div className = "hidden md:block navbar-acc">
          <ul className = "flex items-center gap-[4vw]">
            {(auth && auth?.user?.role === 'job seeker') ? (
              <>
              <li>
                  <Link to = '/myprofile' className = "text-black hover:text-gray-500 font-semibold">My Profile</Link>
              </li> 
              <li>
                  <Link to ='/alljobspost' className = "text-black hover:text-gray-500 font-semibold">Jobs</Link>
              </li> 
              <li>
                  <Link to = '/recomendedjobs'className = "text-black hover:text-gray-500 font-semibold">Recomended Jobs</Link>
              </li> 
              <li>
                  <Link to = '/application' className = "text-black hover:text-gray-500 font-semibold">Applications</Link>
              </li> 
              <li>
                  <Link to = '/home' className = "text-black hover:text-gray-500 font-semibold">Home</Link>
              </li> 
              </>
            ) : (
              (auth && auth?.user?.role === 'employer') ? (
                <>
                  <li>
                    <Link to = '/home' className = "text-black hover:text-gray-500 font-semibold">Dashboard</Link>
                  </li>
                  <li>
                    <Link to = '/jobpost' className = "text-black hover:text-gray-500 font-semibold">Post Jobs</Link>
                  </li>
                  <li>
                    <Link to = '/application' className = "text-black hover:text-gray-500 font-semibold">Applications</Link>
                  </li>
                  <li>
                    <Link to='/allprofile' className = "text-black hover:text-gray-500 font-semibold">Users-Profiles</Link>
                  </li>
                  <li>
                    <Link to='/myjobs' className = "text-black hover:text-gray-500 font-semibold">My Jobs</Link>
                  </li>
                  <li>
                    <Link to='/alljobspost' className = "text-black hover:text-gray-500 font-semibold">Jobs</Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to = '/home' className = "text-black hover:text-gray-500 font-semibold">Dashboard</Link>
                  </li>
                  <li>
                    <Link to='/' className = "text-black hover:text-gray-500 font-semibold" >Login</Link>
                  </li>
                  <li>
                    <Link to = '/register'className = "text-black hover:text-gray-500 font-semibold">Register</Link>
                  </li>
                </>
              )
            )}
          </ul>
        </div>
        <div className = "md:block hidden md:flex md:items-center md:gap-x-5">
          {(auth && auth?.user?.role === 'job seeker') ? (
            <>
              <div className = "logout-class flex justify-center items-center text-center">
                <button className = "bg-pruple-500 text-center text-white py-4 px-7 rounded-full font-semibold text-2xl hover:bg-purple-600" onClick = {Logout}>Logout</button>
              </div>
              {/* <div className = "relative">
                <button
                 id = "dropdown-menu"
                 className = "rounded-full p-1.5 hover:bg-neutral-200 bg-neutral-100"
                 type = "button"
                 >
                  <FaUser className = "h-16 w-16 bg-neutral-200 rounded-full text-neutral-800"/>
                </button>
              </div> */}
            </>
          ) : ((auth && auth?.user?.role === 'employer') ? (
            <>
              <div className = "flex-grow">
                <button className = "bg-pruple-500 hover:bg-purple-600 text-white font-semibold text-center rouneded-full text-2xl" onClick = {Logout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <div className = "flex-grow">
                <button className = "bg-pruple-500 hover:bg-purple-600 text-white font-semibold text-center rouneded-full text-2xl" onClick = {navigate('/')}>Login</button>
              </div>
            </>
          ))
          }
        </div>
        <div className  = "block md:hidden">
          <button className = "bg-pruple-500 hover:bg-purple-600 text-white text-center text-2xl font-semibold px-5 py-2 rounded-full" onClick = {toggleMenu}>
            <div className = "text-xl flex justify-center items-center text-center">{isopen ? 'Close' : 'Open'}</div>
          </button>
        </div>
      </nav>

      <div className = {`${isopen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
        md:hidden block overflow-hidden transition-all ease-in-out duration-300`} >
          <ul className = "flex flex-col justify-center items-center gap-4 mt-4">

          {(auth && auth?.user?.role === 'job seeker') ? (
              <>
              <li>
                  <Link to = '/myprofile' className = "text-black hover:text-gray-500 font-semibold">My Profile</Link>
              </li> 
              <li>
                  <Link to ='/alljobspost' className = "text-black hover:text-gray-500 font-semibold">Jobs</Link>
              </li> 
              <li>
                  <Link to = '/recomendedjobs'className = "text-black hover:text-gray-500 font-semibold">Recomended Jobs</Link>
              </li> 
              <li>
                  <Link to = '/application' className = "text-black hover:text-gray-500 font-semibold">Applications</Link>
              </li> 
              <li>
                  <Link to = '/home' className = "text-black hover:text-gray-500 font-semibold">Home</Link>
              </li> 
              <li>
                <button className = "bg-purple-500 hover:bg-purple-600 text-white text-center px-4 py-2 rounded-full font-semibold" onClick = {Logout}>Logout </button>
              </li>
              </>
            ) : (
              (auth && auth?.user?.role === 'employer') ? (
                <>
                  <li>
                    <Link to = '/home' className = "text-black hover:text-gray-500 font-semibold">Dashboard</Link>
                  </li>
                  <li>
                    <Link to = '/jobpost' className = "text-black hover:text-gray-500 font-semibold">Post Jobs</Link>
                  </li>
                  <li>
                    <Link to = '/application' className = "text-black hover:text-gray-500 font-semibold">Applications</Link>
                  </li>
                  <li>
                    <Link to='/allprofile' className = "text-black hover:text-gray-500 font-semibold">Users-Profiles</Link>
                  </li>
                  <li>
                    <Link to='/myjobs' className = "text-black hover:text-gray-500 font-semibold">My Jobs</Link>
                  </li>
                  <li>
                    <Link to='/alljobspost' className = "text-black hover:text-gray-500 font-semibold">Jobs</Link>
                  </li>
                  <li>
                    <button className = "bg-purple-500 hover:bg-purple-600 text-white text-center px-4 py-2 rounded-full font-semibold" onClick = {Logout}>Logout </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to = '/home' className = "text-black hover:text-gray-500 font-semibold">Dashboard</Link>
                  </li>
                  <li>
                    <Link to='/' className = "text-black hover:text-gray-500 font-semibold" >Login</Link>
                  </li>
                  <li>
                    <Link to = '/register'className = "text-black hover:text-gray-500 font-semibold">Register</Link>
                  </li>
                </>
              )
            )}
          </ul>
        </div>
    </section>
  )
}

export default Header