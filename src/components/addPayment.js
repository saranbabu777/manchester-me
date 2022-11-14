import React, { useState } from 'react';
import * as apiService from '../services/api.service';

const AddPayment = () => {
    const [newSum, setNewSum] = useState([]);
    const [newEmail, setNewEmail] = useState([]);

    const createPayment = () => {
        apiService.createPayment(newEmail, new Date(), 'salary', Number(newSum), 'cash', 'jan', 2022)
    }

    return (
        <>
            add payment
            <input type='text' placeholder='Email' onChange={(e) => { setNewEmail(e.target.value); }} />
            <input type='text' placeholder='Amount' onChange={(e) => { setNewSum(e.target.value); }} />
            <button onClick={createPayment}>Add Payment</button>
        </>
    )
}

export default AddPayment;