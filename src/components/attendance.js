import React, { useEffect, useState } from 'react';
import * as apiService from '../services/api.service';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, FormControl, Card, CardContent, Typography, CardActions, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from 'react-router-dom';
import useNotification from '../common/hooks/useNotification';

const Attendance = () => {
    const [attendanceForm, setAttendanceForm] = useState({
        email: "",
        date: new Date(),
        status: ""
    });
    const params = useParams();
    const { addNotification } = useNotification();

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        const status = params.status.toString();
        setAttendanceForm((prev) => {
            return { ...prev, email: userName ? userName : "", status };
        });
    }, [])

    const handleChange = (change) => {
        setAttendanceForm(prev => {
            return { ...prev, ...change };
        })
    }

    const createAttendance = async () => {
        await apiService.createAttendance(attendanceForm);
        addNotification('Attendance saved successfully', 'success')
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Hello, {attendanceForm.email}
                        </Typography>
                        <div className='attendance-form'>
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
                        <Button variant="contained" onClick={createAttendance}>Proceed</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default Attendance;