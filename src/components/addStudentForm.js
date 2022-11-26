import { Button, FormControl, TextField } from '@mui/material';
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
            name: "",
            phone: "",
            dob: "",
            doj: "",
            active: true
        }, validator
    })

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form className='add-student-form'>
                    <FormControl>
                        <TextField label="Name" variant="outlined" name="name" value={state.name} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <TextField label="Phone" variant="outlined" name="phone" value={state.phone} onChange={handleChange} />
                    </FormControl>
                    <FormControl>
                        <DesktopDatePicker
                            label="Date of Birth"
                            inputFormat="dd/MM/yyyy"
                            value={state.dob}
                            onChange={(value) => handleStateChange({ name: 'dob', value })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <FormControl>
                        <DesktopDatePicker
                            label="Date Of Joining"
                            inputFormat="dd/MM/yyyy"
                            value={state.doj}
                            onChange={(value) => handleStateChange({ name: 'doj', value })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                </form>
                <Button variant="contained" onClick={() => { props.saveStudent(state) }}>Save</Button>
            </LocalizationProvider>
        </>
    )
}

export default AddStudentForm;