// CombinedContext.jsx
import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// Create the two contexts
export const LecSubContext = createContext({});
export const LecturerContext = createContext({});

// LecSubContext Provider
export function LecSubContextProvider({ children }) {
    const [lecSub, setLecSub] = useState(null);

    useEffect(() => {
        if (!lecSub) {
            axios.get('/lecturer-subjects')
                .then(({ data }) => {
                    setLecSub(data);
                })
                .catch(error => {
                    console.error("Error fetching lecturer-subject data:", error);
                });
        }
    }, [lecSub]);

    return (
        <LecSubContext.Provider value={{ lecSub, setLecSub }}>
            {children}
        </LecSubContext.Provider>
    );
}

// LecturerContext Provider
export function LecturerContextProvider({ children }) {
    const [lecturer, setLecturer] = useState(null);

    useEffect(() => {
        if (!lecturer) {
            axios.get('/profileLec')
                .then(({ data }) => {
                    setLecturer(data);
                });
        }
    }, [lecturer]);

    return (
        <LecturerContext.Provider value={{ lecturer, setLecturer }}>
            {children}
        </LecturerContext.Provider>
    );
}

// Combined Provider for both contexts
export function CombinedContextProvider({ children }) {
    return (
        <LecturerContextProvider>
            <LecSubContextProvider>
                {children}
            </LecSubContextProvider>
        </LecturerContextProvider>
    );
}
