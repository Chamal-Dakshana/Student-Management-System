import {useState} from 'react'
import axios from 'axios'

export default function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const registerStudent = async(e) => {
    e.presentDefault();
    const{name, email, password} =data
    try {
      const {data} =await axios.post('/register', {
        name, email, password
      })
    } catch (error) {
      
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