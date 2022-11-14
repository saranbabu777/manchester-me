import React, { useState } from 'react';
import * as apiService from '../services/api.service';

const Dashboard = () => {
    const [newEmail, setNewEmail] = useState([]);

    const createAttendance = () => {
        apiService.createAttendance(newEmail, new Date(), 'IN')
    }

    return (
        <>
            <input type='text' placeholder='Email' onChange={(e) => { setNewEmail(e.target.value); }} />
            <button onClick={createAttendance}>Attendance Save</button>
        </>
    )
}

export default Dashboard;