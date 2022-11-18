import React, { useEffect, useState } from 'react';
import * as apiService from '../services/api.service';
import Button from '@mui/material/Button';
import { Card, CardContent, Typography, CardActions } from "@mui/material";

const StaffDashboard = () => {
    const [attendanceForm, setAttendanceForm] = useState({
        email: "",
        date: new Date(),
        status: "IN"
    });

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        setAttendanceForm((prev) => {
            return { ...prev, email: userName ? userName : "" };
        });
    }, [])

    const createAttendance = () => {
        apiService.createAttendance(attendanceForm)
    }

    return (
        <>
            <Card className='staff-dashboard' sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Hello, {attendanceForm.email} {attendanceForm.date.toDateString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={createAttendance}>Punch In</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default StaffDashboard;