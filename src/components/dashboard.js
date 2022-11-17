import React, { useState } from 'react';
import * as apiService from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, FormControl, Card, CardContent, Typography, CardActions } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const Dashboard = () => {
    const [attendanceForm, setAttendanceForm] = useState({
        email: "",
        date: new Date(),
        status: ""
    });

    const handleChange = (change) => {
        setAttendanceForm(prev => {
            return { ...prev, ...change };
        })
    }

    const createAttendance = () => {
        apiService.createAttendance(attendanceForm)
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Hello, UserName
                        </Typography>
                        <div className='dashboard-form'>
                            <FormControl className='form-field'>
                                <TextField label="Email" variant="outlined" value={attendanceForm.email} onChange={(e) => { handleChange({ email: e.target.value }); }} />
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
                                    <MenuItem value='IN'>Present</MenuItem>
                                    <MenuItem value='OUT'>Apply Leave</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={createAttendance}>Save Changes</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default Dashboard;