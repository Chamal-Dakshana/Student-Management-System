import './App.css'
import {Routes, Route} from 'react-router-dom'
import Navbar from '../src/components/Navbar'
import Home from '../src/pages/Home'
import Register from './pages/Student/Register'
import Login from './pages/Student/Login'
import LecSignIn from '../src/pages/Lecturer/LecSignIn'
import LecRegister from './pages/Lecturer/LecRegister'
import SignNavbar from './components/SignNavbar'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { StudentContextProvider } from '../contest/studentContest'
import Dashboard from './pages/Dashboard'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {

  return (
    <StudentContextProvider>
    <Navbar></Navbar>
    <SignNavbar></SignNavbar>
    <Toaster position= 'bottom-right' toastOptions={{duration: 2000}}></Toaster>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      <Route path='/lecsign' element={<LecSignIn/>}></Route>
      <Route path='/lecregister' element={<LecRegister/>}></Route>
    </Routes>
    </StudentContextProvider>
  )
}

export default App
