import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../services/api.service';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        const getUsers = async () => {
            const data = await apiService.getUsers();
            setAllUsers((prev) => {
                return data;
            });
            setUsers((prev) => {
                return data;
            });
        }
        getUsers();

    }, [])

    const searchUsers = async (search) => {
        const filteredUsers = allUsers.filter(x => x.name.toLowerCase().includes(search.toLowerCase()))
        setUsers((prev) => {
            return filteredUsers;
        });
    }

    const viewUser = (email) => {
        navigate(`/user-details/${email}`);
    }

    const addUser = () => {
        navigate(`/add-user`);
    }

    return (
        <>
            <input type='text' placeholder='Search User' onChange={(e) => { searchUsers(e.target.value); }} />
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
            <button type='button' onClick={addUser}>Add Staff</button>
        </>
    )
}

export default UserList;