import React, { useEffect, useState } from 'react';
import { createPayment } from '../services/api.service';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { FormControl, InputLabel } from "@mui/material";
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useNotification from '../common/hooks/useNotification';
import useAuthentication from '../common/hooks/useAuthentication';

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
    const { addNotification } = useNotification();
    const { auth, permission } = useAuthentication();

    useEffect(() => {
        if (auth?.role === permission.STAFF) {
            const currentUserObject = localStorage.getItem('man-client-user-inf');
            const { email } = currentUserObject ? JSON.parse(currentUserObject) : {};
            setPaymentForm((prev) => {
                return { ...prev, email: email || "" };
            });
        }
    }, [])

    const handleChange = (change) => {
        setPaymentForm(prev => {
            return { ...prev, ...change };
        })
    }

    const savePayment = async () => {
        await createPayment(paymentForm);
        addNotification('Payment added successfully', 'success')
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Add new payment
                    </Typography>
                    <div className='payement-form'>
                        {auth?.role === permission.ADMIN &&
                            <FormControl className='form-field'>
                                <TextField label="Email" variant="outlined" value={paymentForm.email} onChange={(e) => { handleChange({ email: e.target.value }); }} />
                            </FormControl>
                        }
                        <FormControl className='form-field' sx={{ minWidth: 120 }}>
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                id="type"
                                value={paymentForm.type}
                                label="Type"
                                onChange={(e) => { handleChange({ type: e.target.value }); }}
                            >
                                {auth?.role === permission.ADMIN &&
                                    <MenuItem value='salary'>Salary</MenuItem>
                                }
                                <MenuItem value='advance'>Advance</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='form-field'>
                            <TextField label="Amount" variant="outlined" value={paymentForm.sum} onChange={(e) => { handleChange({ sum: e.target.value }); }} />
                        </FormControl>
                        <FormControl className='form-field' sx={{ minWidth: 120 }}>
                            <InputLabel id="mode-label">Mode</InputLabel>
                            <Select
                                labelId="mode-label"
                                id="mode"
                                value={paymentForm.mode}
                                label="Mode"
                                onChange={(e) => { handleChange({ mode: e.target.value }); }}
                            >
                                <MenuItem value='cash'>Cash</MenuItem>
                                <MenuItem value='online'>Online</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className='form-field' sx={{ minWidth: 120 }}>
                            <InputLabel id="forYear-label">Year</InputLabel>
                            <Select
                                labelId="forYear-label"
                                id="forYear"
                                value={paymentForm.forYear}
                                label="For Year"
                                onChange={(e) => { handleChange({ forYear: e.target.value }); }}
                            >
                                {
                                    yearList.map((yr, key) => {
                                        return (
                                            <MenuItem key={`yr${key}`} value={yr}>{yr}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                        <FormControl className='form-field' sx={{ minWidth: 120 }}>
                            <InputLabel id="forMonth-label">Month</InputLabel>
                            <Select
                                labelId="forMonth-label"
                                id="forMonth"
                                value={paymentForm.forMonth}
                                label="For Month"
                                onChange={(e) => { handleChange({ forMonth: e.target.value }); }}
                            >
                                {
                                    monthList.map((mon, key) => {
                                        return (
                                            <MenuItem key={`mon${key}`} value={mon.value}>{mon.label}</MenuItem>
                                        )
                                    })
                                }
                            </Select>
                        </FormControl>
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={savePayment}>Add Payment</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default AddPayment;