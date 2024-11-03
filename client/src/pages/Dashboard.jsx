import {useContext} from 'react'
import { StudentContext } from '../../contest/studentContest'

export default function Dashboard() {
    const {student} =useContext(StudentContext)
    return(
        <div>
            <h1>Dashboard</h1>
            {!!student &&(<h2>HI {student.name}!</h2>)}
        </div>
    )
}