import React, { useEffect, useState } from 'react';
import { filterAttendance } from '../services/api.service';

const Calendar = (props) => {
    const [attendance, setAttendance] = useState([]);
    const [daysOfMonth, setDaysOfMonth] = useState([]);

    useEffect(() => {
        const now = new Date();
        const days = getAllDaysInMonth(now.getFullYear(), now.getMonth())
        setDaysOfMonth((prev) => {
            return days;
        })
    }, [])

    useEffect(() => {
        const getAttendanceDetails = async () => {
            const date = new Date(), y = date.getFullYear(), m = date.getMonth();
            const monthStartDate = new Date(y, m, 1);
            const monthEndDate = new Date(y, m + 1, 0);
            const data = await filterAttendance(props.email, monthStartDate, monthEndDate);
            setAttendance((prev) => {
                return data;
            });
        }
        getAttendanceDetails();
    }, [props.email])

    const getAllDaysInMonth = (year, month) => {
        const date = new Date(year, month, 1);
        const dates = [];
        while (date.getMonth() === month) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return dates;
    }

    const daysByWeek = () => {
        let i = 0;
        const weeks = [];
        if (daysOfMonth.length > 0) {
            const firstDay = daysOfMonth[0].getDay();
            weeks.push([...Array(firstDay).fill(), ...daysOfMonth.slice(i, ((i + 7) - firstDay))]);
            i = 7 - firstDay;
            while (i < daysOfMonth.length) {
                weeks.push(daysOfMonth.slice(i, i + 7))
                i += 7;
            }
        }
        return weeks;
    }

    const present = attendance.filter(x => x.status === 'IN').map(x => x.date.getDate());
    const absent = attendance.filter(x => x.status === 'OUT').map(x => x.date.getDate());

    return (
        <>
            <section className='grid calendar-view'>
                <header>
                    <div className="col">Su</div>
                    <div className="col">Mo</div>
                    <div className="col">Tu</div>
                    <div className="col">We</div>
                    <div className="col">Th</div>
                    <div className="col">Fr</div>
                    <div className="col">Sa</div>
                </header>
                {
                    daysByWeek().map((week, key) => {
                        return (
                            <div className='row' key={"week" + key}>
                                {
                                    week.map((day, dayKey) => {
                                        return (
                                            <div className={
                                                `col ` + (day ? ((present.includes(day.getDate()) ? `yes ` : ``) +
                                                    (absent.includes(day.getDate()) ? `no ` : ``)) : ` disable`)}
                                                key={"day" + dayKey + "week" + key}>
                                                {day ? day.getDate() : null}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </section>
        </>
    )
}

export default Calendar;