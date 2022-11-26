import { Autocomplete, Button, FormControl, TextField } from "@mui/material";
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
                    <FormControl>
                        <DesktopDatePicker
                            label="Date"
                            inputFormat="dd/MM/yyyy"
                            value={state.date}
                            onChange={(value) => handleStateChange({ name: 'date', value })}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </FormControl>
                    <FormControl>
                        <TextField label="Amount" variant="outlined"
                            name="amount"
                            value={state.amount}
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => handleStateChange({ name: 'for', value: newValue ? newValue.value : '' })}
                            options={typeList}
                            renderInput={(params) => <TextField {...params} label="For" />}
                        />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            disablePortal
                            onChange={(event, newValue) => handleStateChange({ name: 'month', value: newValue ? newValue.value : '' })}
                            options={monthList}
                            renderInput={(params) => <TextField {...params} label="Month" />}
                        />
                    </FormControl>
                    <FormControl>
                        <Autocomplete
                            disablePortal
                            onChange={(event, value) => handleStateChange({ name: 'year', value })}
                            options={yearList}
                            renderInput={(params) => <TextField {...params} label="Year" />}
                        />
                    </FormControl>
                </form>
                <Button variant="contained" onClick={() => { props.saveFees(state) }}>Save</Button>
            </LocalizationProvider>
        </>
    )
}

export default AddFeesForm;