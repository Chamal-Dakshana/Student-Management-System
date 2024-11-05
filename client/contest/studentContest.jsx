import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const StudentContext = createContext({})

export function StudentContextProvider({children}) {
    const[student, setStudent] = useState(null);
    useEffect(() => {
        if(!student){
            axios.get('/profile').then(({data}) => {
                setStudent(data)
            })
        }
    }, [])

    
    return (
        <StudentContext.Provider value={{student, setStudent}}>
            {children}
        </StudentContext.Provider>
    )
}