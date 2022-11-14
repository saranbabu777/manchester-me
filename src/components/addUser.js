import React, { useState } from 'react';
import * as apiService from '../services/api.service';

const AddUser = () => {
    const [newName, setNewName] = useState([]);
    const [newEmail, setNewEmail] = useState([]);

    return (
        <>
            add user
            <input type='text' placeholder='Name' onChange={(e) => { setNewName(e.target.value); }} />
            <input type='text' placeholder='Email' onChange={(e) => { setNewEmail(e.target.value); }} />
            <button onClick={() => { apiService.createUser(newName, newEmail); }}>User Save</button>
        </>
    )
}

export default AddUser;