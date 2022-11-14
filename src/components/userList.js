import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../services/api.service';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const getUsers = async () => {
            const data = await apiService.getUsers();
            setUsers((prev) => {
                return data;
            });
        }
        getUsers();

    }, [])

    const searchUsers = async () => {
        const data = await apiService.searchUsers(newName);
        setUsers((prev) => {
            return data;
        });
    }

    const viewUser = (email) => {
        navigate(`/user-details/${email}`);
    }

    return (
        <>
            <input type='text' placeholder='Name' onChange={(e) => { setNewName(e.target.value); }} />
            <button onClick={searchUsers}>Search User</button>
            {
                users.map((user, key) => {
                    return <div key={"user" + key}>
                        <h1>{user.name}</h1>
                        <h2>{user.email}</h2>
                        <button onClick={() => { apiService.deleteUser(user.id); }}>Delete</button>
                        <button onClick={() => { viewUser(user.email); }}>View</button>
                    </div>
                })
            }
        </>
    )
}

export default UserList;