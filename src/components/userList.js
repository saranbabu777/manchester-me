import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadUserList();
    }, [])

    const loadUserList = async () => {
        const data = await getUsers();
        setAllUsers((prev) => {
            return data;
        });
        setUsers((prev) => {
            return data;
        });
    }

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
        <div className='user-list'>
            <FormControl>
                <TextField label="Search User" variant="outlined" onChange={(e) => { searchUsers(e.target.value); }} />
            </FormControl>
            {
                users.map((user, key) => {
                    return <div className='user-block' key={"user" + key} onClick={() => { viewUser(user.email); }}>
                        <p>{user.name}</p>
                        <DeleteIcon onClick={(e) => { e.stopPropagation(); deleteUser(user.id); }} />
                    </div>
                })
            }
            <Button className='add-user-btn' variant="contained" onClick={addUser}>Add Staff</Button>
        </div>
    )
}

export default UserList;