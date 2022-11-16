import React, { useState } from 'react';
import * as apiService from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { styled } from "@mui/material";
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const FormControl = styled('div')(
    ({ theme }) => `
    flex: 1;
    margin:10px;
  `,
);

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
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Add new user
                        </Typography>
                        <FormControl>
                            <TextField label="Name" variant="outlined" value={user.name} onChange={(e) => { handleUserForm({ name: e.target.value }); }} />
                        </FormControl>
                        <FormControl>
                            <TextField label="Email" variant="outlined" value={user.email} onChange={(e) => { handleUserForm({ email: e.target.value }); }} />
                        </FormControl>
                        <FormControl>
                            <TextField label="Phone" variant="outlined" value={user.phone} onChange={(e) => { handleUserForm({ phone: e.target.value }); }} />
                        </FormControl>
                        <FormControl>
                            <DesktopDatePicker
                                label="Date Of Joining"
                                inputFormat="dd/MM/yyyy"
                                value={user.doj}
                                onChange={(value) => handleUserForm({ doj: value })}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </FormControl>
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
                        <FormControl>
                            <TextField label="Gross Salary" variant="outlined" value={user.grossSalary} onChange={(e) => { handleUserForm({ grossSalary: e.target.value }); }} />
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={() => { apiService.createUser(user); }}>User Save</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default AddUser;