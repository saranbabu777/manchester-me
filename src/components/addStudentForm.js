import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React from 'react';
import useForm from '../common/hooks/useForm';

const AddStudentForm = (props) => {

    const validator = (fieldName, fieldValue) => {
        let error = validateRequired(fieldValue);
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
            name: props.student ? props.student.name : "",
            phone: props.student ? props.student.phone : "",
            dob: props.student && props.student.dob ? props.student.dob.toDate() : "",
            doj: props.student && props.student.doj ? props.student.doj.toDate() : "",
            active: props.student ? props.student.active : true
        }, validator
    })

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form className='add-student-form'>
                    <FormControl error={errors.name}>
                        <TextField
                            label="Name"
                            ariant="outlined"
                            name="name"
                            required
                            value={state.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.name &&
                            <FormHelperText>Name is Required</FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.phone}>
                        <TextField
                            label="Phone"
                            variant="outlined"
                            name="phone"
                            required
                            value={state.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.phone &&
                            <FormHelperText>Phone is Required</FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.dob}>
                        <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="dd/MM/yyyy"
                            required
                            value={state.dob}
                            onChange={(value) => handleStateChange({ name: 'dob', value })}
                            onBlur={(e) => { handleBlur({ target: { name: 'dob' } }) }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        {errors.dob &&
                            <FormHelperText>DOB is Required</FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.doj}>
                        <DesktopDatePicker
                            label="Date Of Joining"
                            inputFormat="dd/MM/yyyy"
                            required
                            value={state.doj}
                            onChange={(value) => handleStateChange({ name: 'doj', value })}
                            onBlur={(e) => { handleBlur({ target: { name: 'doj' } }) }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        {errors.doj &&
                            <FormHelperText>DOJ is Required</FormHelperText>
                        }
                    </FormControl>
                    {props.editMode &&
                        <FormControl className='form-field' sx={{ minWidth: 120 }}>
                            <InputLabel id="active-label">Status</InputLabel>
                            <Select
                                labelId="active-label"
                                id="active"
                                label="Active"
                                name="active"
                                value={state.active}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <MenuItem value={true}>Active</MenuItem>
                                <MenuItem value={false}>Inactive</MenuItem>
                            </Select>
                        </FormControl>
                    }
                </form>
                <Button variant="contained" onClick={() => { props.saveStudent(state) }}>Save</Button>
            </LocalizationProvider>
        </>
    )
}

export default AddStudentForm;