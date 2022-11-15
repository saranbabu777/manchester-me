import React, { useState } from 'react';
import * as apiService from '../services/api.service';

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
            <input type='text' placeholder='Email' onChange={(e) => { handleChange({ email: e.target.value }); }} />
            <select onChange={(e) => { handleChange({ status: e.target.value }); }}>
                <option>Select Status</option>
                <option value='IN'>Present</option>
                <option value='OUT'>Apply Leave</option>
            </select>
            <button onClick={createAttendance}>Save Changes</button>
        </>
    )
}

export default Dashboard;