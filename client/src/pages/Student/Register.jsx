import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import student_icon from '../Images/student.png';
import email_icon from '../Images/email.png';
import password_icon from '../Images/password.png';
import '../css/LecSignIn.css';

export default function Register() {
  const navigate = useNavigate();

  //Use handleSignUp function for navigate to sign in page
  const handleSignUp = () => {
    navigate('/');
  };

  const [data, setData] = useState({
    name: '',
    profileImage: null, // Now this will be a base64 string
    email: '',
    password: '',
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setData({ ...data, profileImage: reader.result }); // Convert file to base64 string
    };
  };

  const registerStudent = async (e) => {
    e.preventDefault();
    const { name, profileImage, email, password } = data;

    try {
      const response = await axios.post('/register', {
        name,
        profileImage,
        email,
        password,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ name: '', profileImage: null, email: '', password: '' }); // Reset form
        toast.success('Registration successful! Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.error("An error occurred during registration:", error);
    }
  };

  return (
    <div className='continar'>
      <div className='header'>
        <div className='topic'>STUDENT SIGN UP</div>
        <form onSubmit={registerStudent}>
          <div className='inputs'>
            <div className='input'>
              <img className='Img1' src={student_icon} alt="" />
              <TextField
                className='text1'
                type='text'
                id="filled-basic"
                label="Enter the student name"
                variant="filled"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div className='input1'>
              <label htmlFor="profileImage">Profile Image:</label>
              <input type="file" id="profileImage" accept="image/*" onChange={handleFileChange} />
            </div>
            <div className='input'>
              <img className='Img1' src={email_icon} alt="" />
              <TextField
                className='text1'
                type='email'
                id="filled-basic"
                label="Enter the email"
                variant="filled"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div className='input'>
              <img className='Img1' src={password_icon} alt="" />
              <TextField
                className='text1'
                type='password'
                id="filled-basic"
                label="Enter the password"
                variant="filled"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
            <div className='submit-container'>
              <button className='submit' type='submit' onClick={handleSignUp} >Sign In </button>
              <button className='submit' type='submit'>Sign Up</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
