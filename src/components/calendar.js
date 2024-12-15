import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { deleteAttendance, filterAttendance } from '../services/api.service';
import { NavigateBefore, NavigateNext } from '@mui/icons-material';

const Calendar = (props) => {
    const [attendance, setAttendance] = useState([]);
    const [daysOfMonth, setDaysOfMonth] = useState([]);
    const [dateInCalendar, setDateInCalendar] = useState(new Date());

    useEffect(() => {
        calcDaysOfMonth(dateInCalendar);
    }, [])

    useEffect(() => {
        getAttendanceDetails(dateInCalendar);
    }, [props.email])

    const calcDaysOfMonth = (date) => {
        const days = getAllDaysInMonth(date.getFullYear(), date.getMonth())
        setDaysOfMonth((prev) => {
            return days;
        })
    }

    const getAttendanceDetails = async (date) => {
        const y = date.getFullYear(), m = date.getMonth();
        const monthStartDate = new Date(y, m, 1);
        const nextMonthStartDate = new Date(y, m + 1, 1);
        const data = await filterAttendance(props.email, monthStartDate, nextMonthStartDate);
        setAttendance((prev) => {
            return data;
        });
    }

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

    const handleClick = (increment) => {
        const date = new Date(dateInCalendar);
        const month = date.getMonth() + increment;
        const firstDay = 1;
        const newDate = new Date(date.getFullYear(), month, firstDay);
        setDateInCalendar((prev) => {
            return newDate;
        })
        calcDaysOfMonth(newDate);
        getAttendanceDetails(newDate);
    }

    const handleDoubleClick = (day) => {
        console.log('Attendance document deletion handled here.')
        /*Uncomment following code to delete attendance*/
        // const docs = attendance.filter(x => x.date.getDate() === day.getDate());
        // docs.forEach(async (item) => {
        //     await deleteAttendance(item.id);
        //     console.log('deleted record', item);
        // });
    }

    const formattedDate = () => {
        const dateArray = dateInCalendar ? dateInCalendar.toDateString().split(' ') : ['', '', '', ''];
        return dateArray[1] + ' ' + dateArray[3];
    }

    const present = attendance.filter(x => x.status === 'IN').map(x => x.date.getDate());

    const absent = attendance.filter(x => x.status === 'OUT').map(x => x.date.getDate());

    const half = attendance.filter(x => x.status === 'HALF').map(x => x.date.getDate());

    return (
        <>
            <section className='grid calendar-view'>
                <div className='calendar-action-btn'>
                    <IconButton onClick={() => { handleClick(-1); }}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <NavigateBefore />
                    </IconButton>
                    {formattedDate()}
                    <IconButton onClick={() => { handleClick(1); }}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                    >
                        <NavigateNext />
                    </IconButton>
                </div>
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
                                            <div onDoubleClick={() => handleDoubleClick(day)} className={
                                                `col ` + (day ? ((present.includes(day.getDate()) ? `yes ` : ``) +
                                                    (half.includes(day.getDate()) ? `half ` : ``) +
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