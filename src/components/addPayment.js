import React, { useState } from 'react';
import * as apiService from '../services/api.service';

const yearList = [2022, 2023]
const monthList = [
    { label: `January`, value: `jan` },
    { label: `February`, value: `feb` },
    { label: `March`, value: `mar` },
    { label: `April`, value: `apr` },
    { label: `May`, value: `may` },
    { label: `June`, value: `jun` },
    { label: `July`, value: `jul` },
    { label: `August`, value: `aug` },
    { label: `September`, value: `sep` },
    { label: `October`, value: `oct` },
    { label: `November`, value: `nov` },
    { label: `December`, value: `dec` },
]

const AddPayment = () => {
    const [newSum, setNewSum] = useState([]);
    const [newEmail, setNewEmail] = useState([]);
    const [paymentForm, setPaymentForm] = useState({
        email: "",
        date: new Date(),
        type: "",
        sum: 0,
        mode: "",
        forMonth: "",
        forYear: 0
    });

    const handleChange = (change) => {
        setPaymentForm(prev => {
            return { ...prev, ...change };
        })
    }

    const createPayment = () => {
        apiService.createPayment(paymentForm);
    }

    return (
        <>
            add payment
            <input type='text' placeholder='Email' onChange={(e) => { handleChange({ email: e.target.value }); }} />
            <select onChange={(e) => { handleChange({ type: e.target.value }); }}>
                <option>Select Type</option>
                <option value='salary'>Salary</option>
                <option value='advance'>Advance</option>
            </select>
            <input type='text' placeholder='Amount' onChange={(e) => { handleChange({ sum: e.target.value }); }} />
            <select onChange={(e) => { handleChange({ mode: e.target.value }); }}>
                <option>Select Mode</option>
                <option value='cash'>Cash</option>
                <option value='online'>Online</option>
            </select>
            <select onChange={(e) => { handleChange({ forYear: Number(e.target.value) }) }}>
                <option>Select Year</option>
                {
                    yearList.map((yr, key) => {
                        return (
                            <option key={`yr${key}`} value={yr}>{yr}</option>
                        )
                    })
                }
            </select>
            <select onChange={(e) => { handleChange({ forMonth: e.target.value }) }}>
                <option>Select Month</option>
                {
                    monthList.map((mon, key) => {
                        return (
                            <option key={`mon${key}`} value={mon.value}>{mon.label}</option>
                        )
                    })
                }
            </select>
            <button onClick={createPayment}>Add Payment</button>
        </>
    )
}

export default AddPayment;