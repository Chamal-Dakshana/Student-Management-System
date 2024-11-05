import {useContext} from 'react'
import { StudentContext } from '../../contest/studentContest'
import { LecturerContext } from '../../contest/LecturerContext'
import './css/SignNavbar.css'
import logo_icon from '../pages/Images/logo.png'
import { SubjectContext } from '../../contest/SubjectContext'


export default function SignNavbar(){

    const { student } =useContext(StudentContext)
    const { lecturer } = useContext(LecturerContext);
    const { subject } = useContext(SubjectContext);


    return(
        <div class="navbar"> 
            <div class="navbar-left">
            <img src={logo_icon} alt="Logo" class="navbar-logo"></img>
            <h1 className='main_topic'>NEXTEDU STUDENT MANAGEMENT</h1>
            </div>
            <div class="navbar-right">
            {!!student &&(<h2>HI {student.name}! </h2>)}
            {!!lecturer && <h2>HI {lecturer.name}!</h2>}
            {!!subject && <h2> {subject.name}</h2>}
            </div>
        </div>
    )
}
