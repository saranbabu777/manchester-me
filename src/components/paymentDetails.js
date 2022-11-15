import React, { useEffect, useState } from 'react';
import * as apiService from '../services/api.service';

const yearList = [2022, 2023]
const monthList = [
    { label: `January`, value: 0 },
    { label: `February`, value: 1 },
    { label: `March`, value: 2 },
    { label: `April`, value: 3 },
    { label: `May`, value: 4 },
    { label: `June`, value: 5 },
    { label: `July`, value: 6 },
    { label: `August`, value: 7 },
    { label: `September`, value: 8 },
    { label: `October`, value: 9 },
    { label: `November`, value: 10 },
    { label: `December`, value: 11 },
]
const monthsShort = [`jan`, `feb`, `mar`, `apr`, `may`, `jun`, `jul`, `aug`, `sep`, `oct`, `nov`, `dec`]

const PaymentDetails = (props) => {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [formValue, setFormValue] = useState({
        selectedYear: 0,
        selectedMonth: 0
    });

    useEffect(() => {
        const getPaymentDetails = async () => {
            const now = new Date();
            const data = await apiService.filterPayment(props.email, monthsShort[now.getMonth()], now.getFullYear());
            setPaymentDetails((prev) => {
                return data;
            });
            setFormValue(prev => {
                return { selectedYear: now.getFullYear(), selectedMonth: now.getMonth() };
            })
        }
        getPaymentDetails();
    }, [props.email])

    const handleChange = (change) => {
        setFormValue(prev => {
            return { ...prev, ...change };
        })
    }

    const changePaymentDetails = async () => {
        const data = await apiService.filterPayment(props.email, monthsShort[formValue.selectedMonth], formValue.selectedYear);
        setPaymentDetails((prev) => {
            return data;
        });
    }

    return (
        <>
            <h1>Payments of {props.email}</h1>
            <form>
                <select value={formValue.selectedYear} onChange={(e) => { handleChange({ selectedYear: e.target.value }) }}>
                    {
                        yearList.map((yr, key) => {
                            return (
                                <option key={`yr${key}`} value={yr}>{yr}</option>
                            )
                        })
                    }
                </select>
                <select value={formValue.selectedMonth} onChange={(e) => { handleChange({ selectedMonth: e.target.value }) }}>
                    {
                        monthList.map((mon, key) => {
                            return (
                                <option key={`mon${key}`} value={mon.value}>{mon.label}</option>
                            )
                        })
                    }
                </select>
                <button type='button' onClick={changePaymentDetails}>Get Payment Details</button>
            </form>
            <section className='grid payment-grid'>
                <header>
                    <div className='col'>Date</div>
                    <div className='col'>Type</div>
                    <div className='col'>Sum</div>
                    <div className='col'>Mode</div>
                </header>
                {
                    paymentDetails.length ?
                        paymentDetails.map((row, key) => {
                            return <div className='payment-item' key={"payment" + key}>
                                <div className='col'>{row.date.toDateString()}</div>
                                <div className='col'>{row.type}</div>
                                <div className='col'>{row.sum}</div>
                                <div className='col'>{row.mode}</div>
                            </div>
                        })
                        : <div>No Records To Show</div>
                }
            </section>
        </>
    )
}

export default PaymentDetails;