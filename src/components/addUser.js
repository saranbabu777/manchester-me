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
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useNotification from '../common/hooks/useNotification';
import useForm from '../common/hooks/useForm';


const AddUser = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        role: "",
        phone: "",
        doj: "",
        grossSalary: 0,
    })
    const { addNotification } = useNotification();

    const validator = (fieldName, fieldValue) => {
        let error = false;
        switch (fieldName) {
            case "name":
            case "email":
            case "role":
            case "phone":
            case "doj":
            case "grossSalary":
                error = validateRequired(fieldValue);
                break;
            default:
        }
        return error;
    };

    const validateRequired = (fieldValue) => {
        if (!fieldValue) {
            return true;
        } else {
            return false;
        }
    }

    const { handleChange, handleBlur, state, errors } = useForm({ initState: user, validator })

    const saveUser = async () => {
        const users = await getUserByEmail(state.email);
        if (users.length === 0) {
            const newUser = { ...state, name: state.name.toLowerCase() };
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
                                <TextField label="Name" variant="outlined"
                                    name="name"
                                    required
                                    value={state.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.name}
                                    helperText={errors.name && 'Name is required'}
                                />
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Email" variant="outlined"
                                    name="email"
                                    required
                                    value={state.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.email}
                                    helperText={errors.email && 'Invalid Email'}
                                />
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Phone" variant="outlined"
                                    name="phone"
                                    required
                                    value={state.phone}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.phone}
                                    helperText={errors.phone && 'Invalid Phone No'}
                                />
                            </FormControl>
                            <FormControl className='form-field' error={errors.doj}>
                                <DesktopDatePicker
                                    label="Date Of Joining"
                                    inputFormat="dd/MM/yyyy"
                                    name="doj"
                                    required
                                    value={state.doj}
                                    onChange={(e) => { handleChange({ target: { name: 'doj', value: e } }) }}
                                    onBlur={(e) => { handleBlur({ target: { name: 'doj' } }) }}
                                    renderInput={(params) => <TextField name="doj" {...params} />}
                                />
                                {errors.doj &&
                                    <FormHelperText>DOJ is Required</FormHelperText>
                                }
                            </FormControl>
                            <FormControl className='form-field' sx={{ minWidth: 120 }} error={errors.role}>
                                <InputLabel id="role-label">Role</InputLabel>
                                <Select
                                    labelId="role-label"
                                    id="role"
                                    label="Role"
                                    name="role"
                                    required
                                    value={state.role}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value='admin'>Admin</MenuItem>
                                    <MenuItem value='staff'>Staff</MenuItem>
                                </Select>
                                {errors.role &&
                                    <FormHelperText>Role is Required</FormHelperText>
                                }
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Gross Salary" variant="outlined"
                                    name="grossSalary"
                                    required
                                    value={state.grossSalary}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.grossSalary}
                                    helperText={errors.grossSalary && 'Gross Salary is Required'}
                                />
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