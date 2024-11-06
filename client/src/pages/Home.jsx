import React, { useContext } from 'react';
import { LecSubContext } from '../../contest/LecSubContext';
import { LecturerContext } from '../../contest/LecturerContext';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const Home = () => {
    const { lecSub } = useContext(LecSubContext);

    return (
        <Container>
        <div>
            <Typography variant="h4" component="h2" gutterBottom>Lecturers and  Subjects</Typography >
            {lecSub ? (
                <div>
                    {lecSub.map((item, index) => (
                        <div key={index} className="lecturer-item">
                            <TableContainer component={Paper}>
                            <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Lecturer Name : {item.lecture_name}<div></div> Subject : {item.subject}</TableCell>
                                 </TableRow>
                            </TableHead>
                            </Table>
                            </TableContainer>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Loading lecturer-subject data...</p>
            )}
        </div>
        </Container>
    );
};

export default Home;