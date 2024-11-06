import {useContext} from 'react'
import { StudentContext } from '../../contest/studentContest'
import './css/SignNavbar.css'
import logo_icon from '../pages/Images/logo.png'

export default function SignNavbar(){

    const { student } =useContext(StudentContext)



    return(
        <div class="navbar"> 
            <div class="navbar-left">
            <img src={logo_icon} alt="Logo" class="navbar-logo"></img>
            <h1 className='main_topic'>NEXTEDU STUDENT MANAGEMENT</h1>
            </div>
            <div class="navbar-right">
            {!!student &&(<h2>HI {student.name}! </h2>)}
            </div>
        </div>
    )
}
