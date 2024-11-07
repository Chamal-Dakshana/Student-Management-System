import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { StudentContext } from '../../contest/studentContest';
import { Container, Typography, List, ListItem, ListItemText, Paper } from '@mui/material';

const StudentRegisteredSubjects = () => {
    const { student } = useContext(StudentContext);
    const [registeredSubjects, setRegisteredSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (student) {
            // Fetch registered subjects for the logged-in student
            axios.get(`/registered-subjects?studentName=${student.name}`)
                .then(response => {
                    setRegisteredSubjects(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching registered subjects:", error);
                    setError("Failed to load registered subjects.");
                    setLoading(false);
                });
        }
    }, [student]);

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>
                My Registered Subjects
            </Typography>
            {loading ? (
                <Typography variant="body1">Loading...</Typography>
            ) : error ? (
                <Typography variant="body1" color="error">{error}</Typography>
            ) : registeredSubjects.length > 0 ? (
                <Paper elevation={3}>
                    <List>
                        {registeredSubjects.map((subject, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={subject.subjectName} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            ) : (
                <Typography variant="body1">
                    You have not registered for any subjects yet.
                </Typography>
            )}
        </Container>
    );
};

export default StudentRegisteredSubjects;
