import React, { useEffect, useState } from 'react';
import * as apiService from '../services/api.service';
import Button from '@mui/material/Button';
import { Card, CardContent, Typography, CardActions } from "@mui/material";
import useNotification from '../common/hooks/useNotification';

const StaffDashboard = () => {
    const [attendanceForm, setAttendanceForm] = useState({
        email: "",
        date: new Date(),
        status: "IN"
    });
    const { addNotification } = useNotification();

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        setAttendanceForm((prev) => {
            return { ...prev, email: userName ? userName : "" };
        });
    }, [])

    const createAttendance = async () => {
        const startDate = new Date(attendanceForm.date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(attendanceForm.date);
        endDate.setDate(endDate.getDate() + 1);
        const existingRecords = await apiService.filterAttendance(attendanceForm.email, startDate, endDate);
        if (existingRecords.length === 0) {
            await apiService.createAttendance(attendanceForm);
            addNotification('Attendance saved successfully', 'success')
        } else {
            addNotification('Attendance record already exist', 'error')
        }

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