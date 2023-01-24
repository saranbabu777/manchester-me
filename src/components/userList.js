import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from '@mui/icons-material';
import useNotification from '../common/hooks/useNotification';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const { addNotification } = useNotification();

    useEffect(() => {
        loadUserList();
    }, [])

    const loadUserList = async () => {
        const data = await getUsers();
        setUsers((prev) => {
            return data;
        });
    }

    const searchUsers = () => users ? users.filter(x => x.name.toLowerCase().includes(search.toLowerCase())) : []

    const viewUser = (email) => {
        navigate(`/user-details/${email}`);
    }

    const addUser = () => {
        navigate(`/add-user`);
    }

    const removeUser = (event, id) => {
        event.stopPropagation();
        deleteUser(id);
        addNotification('User deleted successfully', 'success');
        loadUserList();
    }

    return (
        <div className='user-list'>
            <FormControl>
                <TextField label="Search User" variant="outlined" onChange={(e) => { setSearch(e.target.value); }} />
            </FormControl>
            {
                searchUsers().map((user, key) => {
                    return <div className={(user.active ? '' : 'inactive ') + 'user-block'} key={"user" + key} onClick={() => { viewUser(user.email); }}>
                        <p>{user.name} ({user.role})</p>
                        <DeleteIcon onClick={(e) => { removeUser(e, user.id); }} />
                    </div>
                })
            }
            <Button className='add-user-btn' variant="contained" onClick={addUser}>
                <Add /><span>Add Staff</span>
            </Button>
        </div>
    )
}

export default UserList;