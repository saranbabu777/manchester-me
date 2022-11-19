import React, { useState } from 'react';
import { getUserByEmail, createUser } from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { FormControl, InputLabel } from "@mui/material";
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useNotification from '../common/hooks/useNotification';


const AddUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        phone: "",
        grossSalary: 0,
    })
    const { addNotification } = useNotification();

    const handleUserForm = (change) => {
        setUser(prevValue => {
            return { ...prevValue, ...change }
        })
    }

    const saveUser = async () => {
        const users = await getUserByEmail(user.email);
        if (users.length === 0) {
            const newUser = { ...user, name: user.name.toLowerCase() };
            await createUser(newUser);
            addNotification('User saved successfully', 'success');
        } else {
            addNotification('Email already exist!', 'error');
        }
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Add new user
                        </Typography>
                        <div className='user-form'>
                            <FormControl className='form-field'>
                                <TextField label="Name" variant="outlined" value={user.name} onChange={(e) => { handleUserForm({ name: e.target.value }); }} />
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Email" variant="outlined" value={user.email} onChange={(e) => { handleUserForm({ email: e.target.value }); }} />
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Phone" variant="outlined" value={user.phone} onChange={(e) => { handleUserForm({ phone: e.target.value }); }} />
                            </FormControl>
                            <FormControl className='form-field'>
                                <DesktopDatePicker
                                    label="Date Of Joining"
                                    inputFormat="dd/MM/yyyy"
                                    value={user.doj}
                                    onChange={(value) => handleUserForm({ doj: value })}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </FormControl>
                            <FormControl className='form-field' sx={{ minWidth: 120 }}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    value={user.role}
                                    label="Role"
                                    onChange={(event) => handleUserForm({ role: event.target.value })}
                                >
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='staff'>Staff</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Gross Salary" variant="outlined" value={user.grossSalary} onChange={(e) => { handleUserForm({ grossSalary: e.target.value }); }} />
                            </FormControl>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={saveUser}>User Save</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default AddUser;