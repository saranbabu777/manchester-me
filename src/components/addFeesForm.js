import { Autocomplete, Button, FormControl, FormHelperText, TextField } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import useForm from "../common/hooks/useForm";

const typeList = [
    { label: `Registration Fees`, value: `registration_fees` },
    { label: `Monthly Fees`, value: `monthly_fees` }
]
const yearList = [`2021`, `2022`, `2023`]
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

const AddFeesForm = (props) => {

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
            date: new Date(),
            amount: "",
            for: "",
            month: "",
            year: ""
        }, validator
    })

    return (
        <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <form className='add-fees-form'>
                    <FormControl error={errors.date}>
                        <DesktopDatePicker
                            label="Date Of Payment"
                            inputFormat="dd/MM/yyyy"
                            format="dd/MM/yyyy"
                            required
                            value={state.date}
                            onChange={(value) => handleStateChange({ name: 'date', value })}
                            onBlur={(e) => { handleBlur({ target: { name: 'date' } }) }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        {errors.date &&
                            <FormHelperText>Date is Required</FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.amount}>
                        <TextField label="Amount" variant="outlined"
                            name="amount"
                            required
                            value={state.amount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.amount &&
                            <FormHelperText>Amount is Required</FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.for}>
                        <Autocomplete
                            disablePortal
                            required
                            onChange={(event, newValue) => handleStateChange({ name: 'for', value: newValue ? newValue.value : '' })}
                            onBlur={(e) => { handleBlur({ target: { name: 'for' } }) }}
                            options={typeList}
                            renderInput={(params) => <TextField {...params} label="For" />}
                        />
                        {errors.for &&
                            <FormHelperText>Field is Required</FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.month}>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => handleStateChange({ name: 'month', value: newValue ? newValue.value : '' })}
                            onBlur={(e) => { handleBlur({ target: { name: 'month' } }) }}
                            options={monthList}
                            renderInput={(params) => <TextField {...params} label="Fee Towards Month" />}
                        />
                        {errors.month &&
                            <FormHelperText>Field is Required</FormHelperText>
                        }
                    </FormControl>
                    <FormControl error={errors.year}>
                        <Autocomplete
                            disablePortal
                            required
                            onChange={(event, value) => handleStateChange({ name: 'year', value })}
                            onBlur={(e) => { handleBlur({ target: { name: 'year' } }) }}
                            options={yearList}
                            renderInput={(params) => <TextField {...params} label="Fee Towards Year" />}
                        />
                        {errors.year &&
                            <FormHelperText>Field is Required</FormHelperText>
                        }
                    </FormControl>
                </form>
                <Button variant="contained" onClick={() => { props.saveFees(state) }}>Save</Button>
            </LocalizationProvider>
        </>
    )
}

export default AddFeesForm;