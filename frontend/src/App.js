import './App.css';
import {Routes,Route} from 'react-router-dom';
import Login from './components/AuthComponent/Login';
import Register from './components/AuthComponent/Register';
import Home from './components/Home/Home';
import Error404 from './components/ErrorPage/Error404';
import PrivateRoutes from './Routers/PrivateRoutes';
import EmployeeRoutes from './Routers/EmployeeRoutes';
import PostJob from './components/Jobcomponents/PostJob';
import MyJobs from './components/Jobcomponents/MyJobs';
import AllJobs from './components/Jobcomponents/AllJobs';
import SingleJob from './components/Jobcomponents/SingleJob';
import Application from './components/JobSeekerApplication/Application';
import UserApplications from './components/JobSeekerApplication/UserApplications';
import Sidebar from './components/UserProfile/SideBar';
import SingleProfile from './components/UserProfile/SingleProfile';
import UpdateJob from './components/Jobcomponents/UpdateJob';
import RecomendedJobs from './components/Recomendjobs/RecomendedJobs';
import VerifyEmail from './components/AuthComponent/VerifyEmail';
import ForgetPassword from './components/AuthComponent/ForgetPassword';
import ResetPassword from './components/AuthComponent/ResetPassword';
import AllUsers from './components/Users/AllUsers';
import CurrentUserProfile from './components/UserProfile/CurrentUserProfile';


function App() {
  return (
    <>
    <Routes>
      <Route path = '/' element = {<Login/>}/>
      <Route path = '/register' element = {<Register/>}/>
      <Route path = '/error' element = {<Error404/>}/>
      <Route path = '/verify-email/:id/:token' element = {<VerifyEmail/>}/>
      <Route path = '/forget-password' element = {<ForgetPassword/>}/>
      <Route path = '/resetpassword/:token' element ={<ResetPassword/>}/>
      <Route path = '/home' element = {<PrivateRoutes/>}>
        <Route path = "" element = {<Home/>}/>
      </Route>
      <Route path = "/jobpost" element = {<PostJob/>}/>
      <Route path = '/singlejob/:id' element = {<PrivateRoutes/>}>
        <Route path = "" element = {<SingleJob/>}/>
      </Route>
      <Route path = '/alljobspost' element = {<PrivateRoutes/>}>
        <Route path = "" element = {<AllJobs/>}/>
      </Route>
      <Route path = '/application/:id' element = {<PrivateRoutes/>}>
        <Route path = "" element = {<Application/>}/>
      </Route>

      <Route path = "/allprofile" element = {<AllUsers/>}/>

      <Route path = "/application" element = {<UserApplications/>}/>

      <Route path = '/myprofile' element = {<PrivateRoutes/>}>
        <Route path = "" element = {<Sidebar/>}/>
      </Route>
      
      {/* <Route path = "/user-profile" element = {<Sidebar/>}/> */}

      <Route path = "/user-profile" element = {<CurrentUserProfile/>}/>

      <Route path = '/profile/:id' element = {<PrivateRoutes/>}>
        <Route path = "" element = {<SingleProfile/>}/>
      </Route>
      <Route path = '/update-job/:id' element = {<PrivateRoutes/>}>
        <Route path = "" element = {<UpdateJob/>}/>
      </Route>
      <Route path = '/myjobs' element = {<EmployeeRoutes/>}>
        <Route path = "" element = {<MyJobs/>}/>
      </Route>
      <Route path = '/recomendedjobs' element = {<PrivateRoutes/>}>
        <Route path = "" element = {<RecomendedJobs/>}/>
      </Route>
    </Routes>
    </>
  );
}

export default App;
