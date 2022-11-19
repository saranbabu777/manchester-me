import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';
import Calendar from './calendar';

const ManageLeave = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const currentUserObject = localStorage.getItem('man-client-user-inf');
        const loggedInEmail = currentUserObject ? JSON.parse(currentUserObject).email : '';
        setEmail(loggedInEmail);
    }, []);

    const navigateToAttendance = (status) => {
        navigate(`/attendance/${status}`);
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Manage Leave for {email}
                    </Typography>
                    <Calendar email={email} />
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={() => { navigateToAttendance('OUT'); }}>Apply Leave</Button>
                    <Button variant="contained" onClick={() => { navigateToAttendance('IN'); }}>Mark Attendance</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default ManageLeave;