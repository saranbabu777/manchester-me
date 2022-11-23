import React, { useEffect, useState } from 'react';
import { createPayment, getUsers } from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Autocomplete, FormControl, FormHelperText, InputLabel } from "@mui/material";
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useNotification from '../common/hooks/useNotification';
import useAuthentication from '../common/hooks/useAuthentication';
import useForm from '../common/hooks/useForm';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const yearList = [2022, 2023]
const monthList = [
    { label: `January`, value: `jan` },
    { label: `February`, value: `feb` },
    { label: `March`, value: `mar` },
    { label: `April`, value: `apr` },
    { label: `May`, value: `may` },
    { label: `June`, value: `jun` },
    { label: `July`, value: `jul` },
    { label: `August`, value: `aug` },
    { label: `September`, value: `sep` },
    { label: `October`, value: `oct` },
    { label: `November`, value: `nov` },
    { label: `December`, value: `dec` },
]

const AddPayment = () => {
    const [paymentForm, setPaymentForm] = useState({
        email: "",
        date: new Date(),
        type: "",
        sum: 0,
        mode: "",
        forMonth: "",
        forYear: 0
    });
    const [users, setUsers] = useState([]);
    const { addNotification } = useNotification();
    const { auth, permission } = useAuthentication();

    useEffect(() => {
        if (auth?.role === permission.STAFF) {
            const currentUserObject = localStorage.getItem('man-client-user-inf');
            const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
            setPaymentForm((prev) => {
                return { ...prev, email: email || "" };
            });
        } else {
            const loadUserData = async () => {
                const data = await getUsers();
                setUsers((prev) => {
                    return data.map(e => ({ id: e.email, label: e.name }));
                });
            }
            loadUserData();
        }
    }, [])

    const validator = (fieldName, fieldValue) => {
        let error = false;
        switch (fieldName) {
            case "email":
            case "date":
            case "type":
            case "sum":
            case "mode":
            case "forMonth":
            case "forYear":
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

    const { handleChange, handleBlur, state, errors } = useForm({ initState: paymentForm, validator })

    const savePayment = async () => {
        await createPayment(state);
        addNotification('Payment added successfully', 'success')
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Add new payment
                        </Typography>
                        <div className='payement-form'>
                            {auth?.role === permission.ADMIN &&
                                <FormControl className='form-field' sx={{ minWidth: 120 }} error={errors.email}>
                                    <Autocomplete
                                        disablePortal
                                        name="email"
                                        required
                                        value={state.email}
                                        onChange={(e, newValue) => { handleChange({ target: { name: 'email', value: newValue && newValue.id } }) }}
                                        onBlur={(e) => { handleBlur({ target: { name: 'email' } }) }}
                                        error={errors.email}
                                        options={users}
                                        renderInput={(params) => <TextField {...params} label="User" />}
                                    />
                                    {errors.email &&
                                        <FormHelperText>User is Required</FormHelperText>
                                    }
                                </FormControl>
                            }
                            <FormControl className='form-field' error={errors.date}>
                                <DesktopDatePicker
                                    label="Date"
                                    inputFormat="dd/MM/yyyy"
                                    name="date"
                                    required
                                    value={state.date}
                                    onChange={(e) => { handleChange({ target: { name: 'date', value: e } }) }}
                                    onBlur={(e) => { handleBlur({ target: { name: 'date' } }) }}
                                    renderInput={(params) => <TextField name="date" {...params} />}
                                />
                                {errors.date &&
                                    <FormHelperText>Date is Required</FormHelperText>
                                }
                            </FormControl>
                            <FormControl className='form-field' sx={{ minWidth: 120 }} error={errors.type}>
                                <InputLabel id="type-label">Type</InputLabel>
                                <Select
                                    labelId="type-label"
                                    id="type"
                                    label="Type"
                                    name="type"
                                    required
                                    value={state.type}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.type}
                                >
                                    {auth?.role === permission.ADMIN &&
                                        <MenuItem value='salary'>Salary</MenuItem>
                                    }
                                    <MenuItem value='advance'>Advance</MenuItem>
                                </Select>
                                {errors.type &&
                                    <FormHelperText>Type is Required</FormHelperText>
                                }
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Amount" variant="outlined"
                                    name="sum"
                                    required
                                    value={state.sum}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.sum}
                                    helperText={errors.sum && 'Amount is required'}
                                />
                            </FormControl>
                            <FormControl className='form-field' sx={{ minWidth: 120 }} error={errors.mode}>
                                <InputLabel id="mode-label">Mode</InputLabel>
                                <Select
                                    labelId="mode-label"
                                    id="mode"
                                    label="Mode"
                                    name="mode"
                                    required
                                    value={state.mode}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.mode}
                                >
                                    <MenuItem value='cash'>Cash</MenuItem>
                                    <MenuItem value='online'>Online</MenuItem>
                                </Select>
                                {errors.mode &&
                                    <FormHelperText>Mode is Required</FormHelperText>
                                }
                            </FormControl>
                            <FormControl className='form-field' sx={{ minWidth: 120 }} error={errors.forYear}>
                                <InputLabel id="forYear-label">Year</InputLabel>
                                <Select
                                    labelId="forYear-label"
                                    id="forYear"
                                    label="For Year"
                                    name="forYear"
                                    required
                                    value={state.forYear}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.forYear}
                                >
                                    {
                                        yearList.map((yr, key) => {
                                            return (
                                                <MenuItem key={`yr${key}`} value={yr}>{yr}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                {errors.forYear &&
                                    <FormHelperText>For Year is Required</FormHelperText>
                                }
                            </FormControl>
                            <FormControl className='form-field' sx={{ minWidth: 120 }} error={errors.forMonth}>
                                <InputLabel id="forMonth-label">Month</InputLabel>
                                <Select
                                    labelId="forMonth-label"
                                    id="forMonth"
                                    label="For Month"
                                    name="forMonth"
                                    required
                                    value={state.forMonth}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={errors.forMonth}
                                >
                                    {
                                        monthList.map((mon, key) => {
                                            return (
                                                <MenuItem key={`mon${key}`} value={mon.value}>{mon.label}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                {errors.forMonth &&
                                    <FormHelperText>For Month is Required</FormHelperText>
                                }
                            </FormControl>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={savePayment}>Add Payment</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default AddPayment;