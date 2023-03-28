import React, { useEffect, useState } from 'react';

const monthShortNames = [`jan`, `feb`, `mar`, `apr`, `may`, `jun`,
    `jul`, `aug`, `sep`, `oct`, `nov`, `dec`];

const PendingFees = (props) => {

    const [pendingList, setPendingList] = useState([]);

    useEffect(() => {
        if (props.fees.length) {
            const sortedFees = [...props.fees].sort((a, b) => {
                return Number(a.year) - Number(b.year) || monthShortNames.indexOf(a.month) - monthShortNames.indexOf(b.month);
            })
            const joinedMon = sortedFees[0].month;
            const joinedYear = sortedFees[0].year;
            const today = new Date();
            const todayMon = today.getMonth();
            const todayYear = today.getFullYear();

            const pending = []
            for (let i = Number(joinedYear); i <= todayYear; i++) {
                let currentMonIndex = (i === Number(joinedYear)) ? monthShortNames.indexOf(joinedMon) : 0;
                const limit = (i < todayYear) ? 11 : todayMon;
                while (currentMonIndex <= limit) {
                    const len = [...props.fees].filter(x => x.month == monthShortNames[currentMonIndex] && Number(x.year) == i).length;
                    if (len === 0) {
                        pending.push({ month: monthShortNames[currentMonIndex], year: i })
                    }
                    currentMonIndex++;
                }
            }

            setPendingList(pending);
        }
    }, [props.fees])

    return (
        <div className='pending-fees'>
            {pendingList.length ?
                pendingList.map((pending, key) => (
                    <div className='item' key={'pending' + key}>
                        {pending.year} {pending.month}
                    </div>
                )) :
                <div>No records found</div>
            }
        </div>
    )
}

export default PendingFees;