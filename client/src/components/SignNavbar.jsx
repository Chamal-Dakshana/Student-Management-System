import React from 'react';
import './css/SignNavbar.css'
import logo_icon from '../pages/Images/logo.png'
import { useNavigate } from 'react-router-dom';

export default function SignNavbar(){

    const navigate = useNavigate();

    //Use handleSignUp function for navigate to sign in page
    const StudentSignUp = () => {
    navigate('/');
    };

    //Use handleSignUp function for navigate to sign in page
    const LecturerSignUp = () => {
        navigate('/lecsign');
        };

    return(
        <div class="navbar"> 
            <div class="navbar-left">
            <img src={logo_icon} alt="Logo" class="navbar-logo"></img>
            <h1 className='main_topic'>NEXTEDU STUDENT MANAGEMENT</h1>
            </div>
            <div class="navbar-right">
                <button onClick={LecturerSignUp}>LECTURER</button>
                <button onClick={StudentSignUp}>STUDENT</button>
            </div>
        </div>
    )
}