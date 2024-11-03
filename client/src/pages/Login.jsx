import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()
    const [data,setData] = useState({
        email: '',
        password: '',        
    })

    const loginStudent = async (e) =>{
        e.preventDefault()
        const {email, password} = data
        try {
            const {data} =await axios.post('/login',{
                email,
                password
            });
            if(data.error) {
                toast.error(data.error)
            }else{
                setData({});
                navigate('/')
            }
        } catch (error) {
            
        }
    }

    return(
        <div>
            <form onSubmit={loginStudent}>
                <label>Email</label>
                <input type = 'email' placeholder='Please Enter the valid Email.' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                <label>Password</label>
                <input type = 'password' placeholder='Please Enter Password symbols.' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}