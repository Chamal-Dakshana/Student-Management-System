import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import '../css/LecSignIn.css'
import TextField from '@mui/material/TextField';
import lecturer_icon from '../Images/lecturer.png'
import email_icon from '../Images/email.png'
import password_icon from '../Images/password.png'
import subject_icon from '../Images/subject.png'


export default function LecRegister() {

    const navigate = useNavigate();
  
    //Use handleSignUp function for navigate to sign in page
    const handleSignUp = () => {
        navigate('/lecsign');
    };

    const [data, setData] = useState({
        name: '',
        subject: '',
        email: '',
        password: ''
    })

    const signUnLecture = async(e) => {
        e.preventDefault()
        const {name, email, subject, password} = data
        try {
            const {data} = await axios.post('/lecregister', {
                name, subject, email, password
            })
            if(data.error) {
                toast.error(data.error)
            }else {
                setData({})
                toast.success('Lecture Login Successful. welcome!')
                navigate('/lecsign')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <div className='continar'>
            <div className='header'>
            <div className='topic'>LECTURER SIGN UP</div>
            <form onSubmit={signUnLecture}>
            <div className='inputs'>
                <div className='input'>
                <img className='Img1' src={lecturer_icon} alt="" />
                <TextField className='text1' type='text' id="filled-basic" label="Enter the Lecturer name" variant="filled" value={data.name} onChange={(e) => setData({...data, name:e.target.value})}/>
                </div>
                <div className='input'>
                <img className='Img1' src={subject_icon} alt="" />
                <TextField className='text1' type= 'text' id="filled-basic" label="Enter the Subject" variant="filled" value={data.subject} onChange={(e) => setData({...data, subject:e.target.value})}/>
                </div>
                <div className='input'>
                <img className='Img1' src={email_icon} alt="" />
                <TextField className='text1' type ='email' id="filled-basic" label="Enter the email" variant="filled" value={data.email} onChange={(e) => setData({...data, email:e.target.value})}/>
                </div>
                <div className='input'>
                <img className='Img1' src={password_icon} alt="" />
                <TextField className='text1' type ='password' id="filled-basic" label="Enter the password" variant="filled" value={data.password} onChange={(e) => setData({...data, password:e.target.value})}/>
                </div>           
            </div>
            <div className='submit-container'>
            <button className='submit' type='submit' onClick={handleSignUp} >Sign In </button>
            <button className='submit' type='submit'>Sign Up</button>
            </div>
            </form>
            </div>  
        </div>
    )    
}