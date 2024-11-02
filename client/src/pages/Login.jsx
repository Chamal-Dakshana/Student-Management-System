import {useState} from 'react'
import axios from 'axios'

export default function Login() {

    const [data,setData] = useState({
        email: '',
        password: '',        
    })

    const loginStudent = (e) =>{
        e.presentDefault()
        axios.get('/')
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