import {useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const navigate =useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerStudent = async(e) => {
    e.preventDefault();
    const{name, email, password} =data
    try {
      const {data} =await axios.post('/register', {
        name, email, password
      })
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        toast.success(' login Successful welcome! ')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  } 

    return(
        <div>
            <form onSubmit={registerStudent}>
                 <label>Name</label>
                 <input type = 'text' placeholder='Please Enter the valid name.' value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                 <label>Email</label>
                 <input type = 'email' placeholder='Please Enter the valid Email.' value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
                 <label>Password</label>
                 <input type = 'password' placeholder='Please Enter Password symbols.' value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
                 <button type='submit'>Submit</button>
            </form>
        </div>
    )
}