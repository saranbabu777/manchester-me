import React, { useEffect, useState } from 'react';
import * as apiService from '../services/api.service';

const Attendance = (props) => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        const getAttendanceDetails = async () => {
            const monthStartDate = '2022-11-01';
            const monthEndDate = '2022-11-30';
            const data = await apiService.filterAttendance(props.email, monthStartDate, monthEndDate);
            setAttendance((prev) => {
                return data;
            });
        }
        getAttendanceDetails();
    }, [props.email])

    return (
        <>
            <h1>attendance of {props.email}</h1>
            {
                attendance.map((row, key) => {
                    return <div key={"attendance" + key}>
                        <h1>{row.date.toDateString()}</h1>
                        <h2>{row.status}</h2>
                    </div>
                })
            }
        </>
    )
}

export default Attendance;