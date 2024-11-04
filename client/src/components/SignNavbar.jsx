import React from 'react';
import './css/SignNavbar.css'
import logo_icon from '../pages/Images/logo.png'

export default function SignNavbar(){
    return(
        <div class="navbar"> 
            <div class="navbar-left">
            <img src={logo_icon} alt="Logo" class="navbar-logo"></img>
            <h1 className='main_topic'>NEXTEDU STUDENT MANAGEMENT</h1>
            </div>
            <div class="navbar-right">
                <button>LECTURER</button>
                <button>STUDENT</button>
            </div>
        </div>
    )
}