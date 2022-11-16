import React, { useState } from 'react';
import * as apiService from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, FormControl } from "@mui/material";

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
            <FormControl>
                <TextField label="Email" variant="outlined" value={attendanceForm.email} onChange={(e) => { handleChange({ email: e.target.value }); }} />
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
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
            <Button variant="contained" onClick={createAttendance}>Save Changes</Button>
        </>
    )
}

export default Dashboard;