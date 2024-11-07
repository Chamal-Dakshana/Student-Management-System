import React, { useContext, useState } from 'react';
import { LecSubContext } from '../../contest/LecSubContext';
import { StudentContext } from '../../contest/studentContest';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const Home = () => {
    const { lecSub } = useContext(LecSubContext);
    const { student } = useContext(StudentContext);
    const [registeredSubjects, setRegisteredSubjects] = useState([]);
    const navigate = useNavigate();

    const handleRegister = async (subject) => {
        try {
            if (student) {
                const data = {
                    studentName: student.name,
                    subjectName: subject
                };
                await axios.post('/register-subject', data);
                alert("Registration successful!");
            } else {
                alert("Please log in as a student to register for a subject.");
            }
        } catch (error) {
            console.error("Registration failed:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <Container>
            <Typography variant="h4" component="h2" gutterBottom>Lecturers and Subjects</Typography>
            {lecSub ? (
                lecSub.map((item, index) => (
                    <div key={index} className="lecturer-item">
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Lecturer Name: {item.lecture_name}<br />
                                            Subject: {item.subject}
                                            <div style={{ marginTop: '10px' }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={() => handleRegister(item.subject)}
                                                >
                                                    Register
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            ) : (
                <p>Loading lecturer-subject data...</p>
            )}

            <div style={{ marginTop: '20px' }}>
                <Button variant="contained" color="secondary" onClick={() => navigate('/registered-subjects')}>
                    Show Registered Subjects
                </Button>
            </div>

            {registeredSubjects.length > 0 && (
                <div style={{ marginTop: '20px' }}>
                    <Typography variant="h5" component="h3">Registered Subjects</Typography>
                    <ul>
                        {registeredSubjects.map((subject, index) => (
                            <li key={index}>{subject.subjectName}</li>
                        ))}
                    </ul>
                </div>
            )}
        </Container>
    );
};

export default Home;
