import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import '../css/LecSignIn.css'
import TextField from '@mui/material/TextField';
import email_icon from '../Images/email.png'
import password_icon from '../Images/password.png'




export default function LecSignIn() {

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/lecregister');
      };

    const [data, setData] = useState({
        email:'',
        password:'' 
    })

    const signInLecture = (e) => {
        e.preventDefault()
    }

    return(
        <div className='continar'>
            <div className='header'>
            <div className='topic'>LECTURER SIGN IN</div>
            <form onSubmit={signInLecture}>
            <div className='inputs'>
                <div className='input'>
                <img className='Img1' src={email_icon} alt="" />
                <TextField className='text1' type='email' id="filled-basic" label="Enter the name" variant="filled" value={data.email} onChange={(e) => setData({...data, email:e.target.value})}/>
                </div>
                <div className='input'>
                <img className='Img1' src={password_icon} alt="" />
                <TextField className='text1' type='password' id="filled-basic" label="Enter the password" variant="filled" value={data.password} onChange={(e) => setData({...data, password:e.target.value})}/>
                </div>           
            </div>
            <div className='submit-container'>
            <button className='submit' type='submit' >Sign In </button>
            <button className='submit' type='submit' onClick={handleSignUp}>Sign Up</button>
            </div>
            </form>
            </div>  
        </div>
    )    
}