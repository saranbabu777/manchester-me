import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as apiService from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";

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
            <FormControl>
                <TextField label="Search User" variant="outlined" onChange={(e) => { searchUsers(e.target.value); }} />
            </FormControl>
            {
                users.map((user, key) => {
                    return <div key={"user" + key}>
                        <h1>{user.name}</h1>
                        <h2>{user.email}</h2>
                        <Button variant="contained" onClick={() => { apiService.deleteUser(user.id); }}>Delete</Button>
                        <Button variant="contained" onClick={() => { viewUser(user.email); }}>View</Button>
                    </div>
                })
            }
            <Button variant="contained" onClick={addUser}>Add Staff</Button>
        </>
    )
}

export default UserList;