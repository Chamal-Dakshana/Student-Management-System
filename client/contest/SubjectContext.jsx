import axios from 'axios'
import { createContext, useState, useEffect } from 'react'

export const SubjectContext = createContext({})

export function SubjectContextProvider({children}) {
    const[subject, setSubject] = useState(null);
    useEffect(() => {
        if(!subject){
            axios.get('/profileSub').then(({data}) => {
                setSubject(data)
            })
        }
    }, [])

    
    return (
        <SubjectContext.Provider value={{subject, setSubject}}>
            {children}
        </SubjectContext.Provider>
    )
}