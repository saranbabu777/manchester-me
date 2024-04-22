import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, FormControl, Card, CardContent, Typography, CardActions, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const StudentAttendanceForm = ({onSubmit}) => {
    const [attendanceForm, setAttendanceForm] = useState({
        date: new Date(),
        status: ""
    });
    
    const handleChange = (change) => {
        setAttendanceForm(prev => {
            return { ...prev, ...change };
        })
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Mark student attendance
                        </Typography>
                        <div className='attendance-form'>
                            <FormControl className='form-field'>
                                <DesktopDatePicker
                                    label="Select Date"
                                    inputFormat="dd/MM/yyyy"
                                    format="dd/MM/yyyy"
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
                                    <MenuItem value='IN'>Present</MenuItem>
                                    <MenuItem value='OUT'>Absent</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={() => onSubmit(attendanceForm)}>Mark Attendance</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default StudentAttendanceForm;