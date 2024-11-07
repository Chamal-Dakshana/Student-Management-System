import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from '../src/pages/Home'
import LecHome from '../src/pages/LecHome'
import Register from './pages/Student/Register'
import Login from './pages/Student/Login'
import LecSignIn from '../src/pages/Lecturer/LecSignIn'
import LecRegister from './pages/Lecturer/LecRegister'
import SignNavbar from './components/SignNavbar'
import MainNavbar from './components/MainNavbar'
import SubRegister from './pages/Subjects/SubRegister'
import SubSignIn from './pages/Subjects/SubSignIn'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { StudentContextProvider } from '../contest/studentContest'
import { LecturerContextProvider } from '../contest/LecturerContext'
import { SubjectContextProvider } from '../contest/SubjectContext'
import { LecSubContextProvider } from '../contest/LecSubContext'

import StudentRegisteredSubjects from '../src/pages/StudentRegisteredSubjects'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  const location = useLocation()

  // Define paths where SignNavbar should be displayed
  const authPaths = ['/', '/register', '/lecsign', '/lecregister', '/subregister', '/subsignin']

  return (
    <LecSubContextProvider>
      <LecturerContextProvider>
        <StudentContextProvider>
          <SubjectContextProvider>
            {/* Conditionally render SignNavbar or MainNavbar based on the current route */}
            {authPaths.includes(location.pathname) ? <SignNavbar /> : <MainNavbar />}
            
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/lechome' element={<LecHome />} />
              <Route path='/registered-subjects' element={<StudentRegisteredSubjects />} />
              <Route path='/' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/lecsign' element={<LecSignIn />} />
              <Route path='/lecregister' element={<LecRegister />} />
              <Route path='/mainnavbar' element={<MainNavbar />} />
              <Route path='/subregister' element={<SubRegister />} />
              <Route path='/subsignin' element={<SubSignIn />} />
            </Routes>
          </SubjectContextProvider>
        </StudentContextProvider>
      </LecturerContextProvider>
    </LecSubContextProvider>
  )
}

export default App
