import React, { useState } from 'react';
import * as apiService from '../services/api.service';

const AddUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        phone: "",
        grossSalary: 0,
    })

    const handleUserForm = (change) => {
        setUser(prevValue => {
            return { ...prevValue, ...change }
        })
    }

    return (
        <>
            add user
            <input type='text' placeholder='Name' onChange={(e) => { handleUserForm({ name: e.target.value }); }} />
            <input type='text' placeholder='Email' onChange={(e) => { handleUserForm({ email: e.target.value }); }} />
            <input type='text' placeholder='Phone' onChange={(e) => { handleUserForm({ phone: e.target.value }); }} />
            <select placeholder='Role' onChange={(e) => { handleUserForm({ role: e.target.value }); }}>
                <option value='admin'>Admin</option>
                <option value='staff'>Staff</option>
            </select>
            <input type='text' placeholder='Gross Salary' onChange={(e) => { handleUserForm({ grossSalary: Number(e.target.value) }); }} />
            <button onClick={() => { apiService.createUser(user); }}>User Save</button>
        </>
    )
}

export default AddUser;