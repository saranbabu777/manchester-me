import React, { useEffect, useState } from 'react';
import { createAttendance, filterAttendance } from '../services/api.service';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, FormControl, Card, CardContent, Typography, CardActions, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from 'react-router-dom';
import useNotification from '../common/hooks/useNotification';
import useAuthentication from '../common/hooks/useAuthentication';

const Attendance = () => {
    const [attendanceForm, setAttendanceForm] = useState({
        email: "",
        date: new Date(),
        status: ""
    });
    const params = useParams();
    const { addNotification } = useNotification();
    const { auth, permission } = useAuthentication();

    useEffect(() => {
        if (auth?.role === permission.STAFF) {
            const currentUserObject = localStorage.getItem('man-client-user-inf');
            const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
            const status = params.status && params.status.toString();
            setAttendanceForm((prev) => {
                return { ...prev, email: email || "", status: status || "" };
            });
        }
    }, [])

    const handleChange = (change) => {
        setAttendanceForm(prev => {
            return { ...prev, ...change };
        })
    }

    const saveAttendance = async () => {
        const startDate = new Date(attendanceForm.date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(attendanceForm.date);
        endDate.setDate(endDate.getDate() + 1);
        const existingRecords = await filterAttendance(attendanceForm.email, startDate, endDate);
        if (existingRecords.length === 0) {
            await createAttendance(attendanceForm);
            addNotification('Attendance saved successfully', 'success')
        } else {
            addNotification('Attendance record already exist', 'error')
        }
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Manage Attendance
                        </Typography>
                        <div className='attendance-form'>
                            {auth?.role === permission.ADMIN &&
                                <FormControl className='form-field'>
                                    <TextField label="Email" variant="outlined" value={attendanceForm.email} onChange={(e) => { handleChange({ email: e.target.value }); }} />
                                </FormControl>
                            }
                            <FormControl className='form-field'>
                                <DesktopDatePicker
                                    label="Select Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={attendanceForm.date}
                                    onChange={(value) => handleChange({ date: value })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                            <FormControl className='form-field' sx={{ minWidth: 120 }}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    id="status"
                                    label="Status"
                                    labelId="status-label"
                                    value={attendanceForm.status}
                                    onChange={(e) => { handleChange({ status: e.target.value }); }}
                                >
                                    <MenuItem value='IN'>Mark as present</MenuItem>
                                    <MenuItem value='OUT'>Apply Leave</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={saveAttendance}>Proceed</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default Attendance;