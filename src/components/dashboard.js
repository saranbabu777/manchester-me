import React, { useState } from 'react';
import * as apiService from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from "@mui/material";

const FormControl = styled('div')(
    ({ theme }) => `
    flex: 1;
    margin:10px;
  `,
);
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
            <Select
                labelId="status-label"
                id="status"
                value={attendanceForm.status}
                label="Status"
                onChange={(e) => { handleChange({ status: e.target.value }); }}
            >
                <MenuItem value='IN'>Present</MenuItem>
                <MenuItem value='OUT'>Apply Leave</MenuItem>
            </Select>
            <Button variant="contained" onClick={createAttendance}>Save Changes</Button>
        </>
    )
}

export default Dashboard;