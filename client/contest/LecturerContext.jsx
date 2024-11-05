import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const LecturerContext = createContext({})

export function LecturerContextProvider({children}) {
    const[lecturer, setLecturer] = useState(null);
    useEffect(() => {
        if(!lecturer){
            axios.get('/profileLec').then(({data}) => {
                setLecturer(data)
            })
        }
    }, [])

    
    return (
        <LecturerContext.Provider value={{lecturer, setLecturer}}>
            {children}
        </LecturerContext.Provider>
    )
}