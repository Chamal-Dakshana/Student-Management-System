import {useNavigate} from 'react-router-dom'
import '../css/LecSignIn.css'
import TextField from '@mui/material/TextField';
import lecturer_icon from '../Images/lecturer.png'
import email_icon from '../Images/email.png'
import password_icon from '../Images/password.png'
import subject_icon from '../Images/subject.png'


export default function LecRegister() {

    const navigate = useNavigate();

    const handleSignUp = () => {
        navigate('/lecsign');
    };

    const signInLecture = (e) => {
        e.preventDefault()
    }

    return(
        <div className='continar'>
            <div className='header'>
            <div className='topic'>LECTURER SIGN UP</div>
            <form onSubmit={signInLecture}>
            <div className='inputs'>
                <div className='input'>
                <img className='Img1' src={lecturer_icon} alt="" />
                <TextField className='text1' type= 'text' id="filled-basic" label="Enter the Lecturer name" variant="filled" />
                </div>
                <div className='input'>
                <img className='Img1' src={subject_icon} alt="" />
                <TextField className='text1' type= 'text' id="filled-basic" label="Enter the Subject" variant="filled" />
                </div>
                <div className='input'>
                <img className='Img1' src={email_icon} alt="" />
                <TextField className='text1' type ='email' id="filled-basic" label="Enter the email" variant="filled" />
                </div>
                <div className='input'>
                <img className='Img1' src={password_icon} alt="" />
                <TextField className='text1' type ='password' id="filled-basic" label="Enter the password" variant="filled" />
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