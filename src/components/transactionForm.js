import { Button, Card, CardActions, CardContent, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import useForm from '../common/hooks/useForm';

const TransactionForm = ({ addTransaction, defaultDate }) => {

    const handleClick = () => {
        const copyState = { ...state }
        if (state.type === 'game') {
            copyState.description = '';
        } else {
            copyState.startTime = defaultDate;
            copyState.endTime = defaultDate;
        }
        addTransaction(copyState)
    }

    const validator = (fieldName, fieldValue) => {
        let error = false;
        switch (fieldName) {
            case "date":
            case "type":
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

    const { handleStateChange, handleChange, handleBlur, state, errors } = useForm({
        initState: {
            date: defaultDate || new Date(),
            startTime: defaultDate || new Date(),
            endTime: defaultDate || new Date(),
            description: "",
            cash: 0,
            online: 0,
            type: "",
            playspots: 0,
            remarks: ""
        }, validator
    })

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Add new transaction
                        </Typography>
                        <div className='transaction-form'>
                            <FormControl className='form-field' error={errors.date}>
                                <DesktopDatePicker
                                    label="Date"
                                    inputFormat="dd/MM/yyyy"
                                    name="date"
                                    required
                                    value={state.date}
                                    onChange={(e) => { handleStateChange({ name: 'date', value: e }) }}
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
                                    <MenuItem value='game'>Game</MenuItem>
                                    <MenuItem value='academy'>Academy</MenuItem>
                                    <MenuItem value='expense'>Expense</MenuItem>
                                </Select>
                                {errors.type &&
                                    <FormHelperText>Type is Required</FormHelperText>
                                }
                            </FormControl>
                            {(state.type === 'game') &&
                                <>
                                    <FormControl className='form-field'>
                                        <MobileTimePicker
                                            label="Start Time"
                                            name="startTime"
                                            value={state.startTime}
                                            onChange={(e) => { handleStateChange({ name: 'startTime', value: e }) }}
                                            onBlur={(e) => { handleBlur({ target: { name: 'startTime' } }) }}
                                        />
                                    </FormControl>
                                    <FormControl className='form-field'>
                                        <MobileTimePicker
                                            label="End Time"
                                            name="endTime"
                                            value={state.endTime}
                                            onChange={(e) => { handleStateChange({ name: 'endTime', value: e }) }}
                                            onBlur={(e) => { handleBlur({ target: { name: 'endTime' } }) }}
                                        />
                                    </FormControl>
                                </>
                            }
                            {(state.type !== 'game') &&
                                <FormControl className='form-field'>
                                    <TextField label="Description" variant="outlined"
                                        name="description"
                                        value={state.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </FormControl>
                            }
                            <FormControl className='form-field'>
                                <TextField label="Cash" variant="outlined"
                                    name="cash"
                                    value={state.cash}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Online" variant="outlined"
                                    name="online"
                                    value={state.online}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Playspots" variant="outlined"
                                    name="playspots"
                                    value={state.playspots}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormControl>
                            <FormControl className='form-field'>
                                <TextField label="Remarks" variant="outlined"
                                    name="remarks"
                                    value={state.remarks}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            </FormControl>
                        </div>
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" onClick={handleClick}>Add Transaction</Button>
                    </CardActions>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default TransactionForm;