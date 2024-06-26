import React, { useEffect, useState } from 'react';
import { filterPayment, getUserByEmail, deletePayment } from '../services/api.service';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { InputLabel, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import useAuthentication from '../common/hooks/useAuthentication';

const yearList = [2022, 2023, 2024]
const monthList = [
    { label: `January`, value: 0 },
    { label: `February`, value: 1 },
    { label: `March`, value: 2 },
    { label: `April`, value: 3 },
    { label: `May`, value: 4 },
    { label: `June`, value: 5 },
    { label: `July`, value: 6 },
    { label: `August`, value: 7 },
    { label: `September`, value: 8 },
    { label: `October`, value: 9 },
    { label: `November`, value: 10 },
    { label: `December`, value: 11 },
]
const monthsShort = [`jan`, `feb`, `mar`, `apr`, `may`, `jun`, `jul`, `aug`, `sep`, `oct`, `nov`, `dec`]
const columns = [
    {
        field: "date",
        headerName: "Date",
        width: 150,
        renderCell: (params) => {
            return params.value ? params.value.toDate().toDateString() : '';
        }
    },
    { field: 'type', headerName: 'Type' },
    { field: 'sum', headerName: 'Sum' },
    { field: 'mode', headerName: 'Mode' },
    { field: 'lastUpdatedBy', headerName: 'Last Updated User', width: 250 },
    {
        field: "lastUpdatedOn",
        headerName: "Last Updated Date",
        width: 150,
        renderCell: (params) => {
            return params.value ? params.value.toDate().toDateString() : '';
        }
    },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
            const onClick = async (e) => {
                e.stopPropagation();
                alert('Row will get deleted!');
                await deletePayment(params.id);
            };
            return <Button onClick={onClick}><DeleteIcon /></Button>;
        }
    }
]

const PaymentDetails = (props) => {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [formValue, setFormValue] = useState({
        selectedYear: 0,
        selectedMonth: 0
    });
    const [lopDays, setLopDays] = useState('')
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({ action: false });
    const { auth, permission } = useAuthentication();

    useEffect(() => {
        const getUser = async () => {
            const users = await getUserByEmail(props.email);
            setUserDetails(users[0])
        }
        getUser();
        const now = new Date();
        setFormValue({ selectedYear: now.getFullYear(), selectedMonth: now.getMonth() })
        /*Enable delete button for Admin*/
        if (auth?.role === permission.ADMIN) {
            setColumnVisibilityModel(({ action: true }));
        }
    }, [props.email])

    useEffect(() => {
        changePaymentDetails();
    }, [formValue])

    const handleChange = (change) => {
        setFormValue(prev => {
            return { ...prev, ...change };
        })
    }

    const changePaymentDetails = async () => {
        const data = await filterPayment(props.email, monthsShort[formValue.selectedMonth], formValue.selectedYear);
        setPaymentDetails(data);
    }

    const handleLopChange = (e) => {
        const onlyNumbers = /^\d*\.?\d*$/;
        if (onlyNumbers.test(e.target.value)) {
            setLopDays(e.target.value)
        }
    }

    const total = (() => {
        return paymentDetails.reduce((sum, payment) => {
            return sum + (Number(payment.sum))
        }, 0);
    })()

    const balance = ((Number(userDetails?.grossSalary) - total) -
        Math.floor(lopDays * Math.floor(Number(userDetails?.grossSalary) / 30)));

    return (
        <>
            <form className='payment-details-form'>
                <FormControl className='form-field' sx={{ minWidth: 120 }}>
                    <InputLabel id="year-label">Year</InputLabel>
                    <Select
                        labelId="year-label"
                        id="year"
                        value={formValue.selectedYear}
                        label="Year"
                        onChange={(e) => { handleChange({ selectedYear: Number(e.target.value) }); }}
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
                    <InputLabel id="month-label">Month</InputLabel>
                    <Select
                        labelId="month-label"
                        id="month"
                        value={formValue.selectedMonth}
                        label="Month"
                        onChange={(e) => { handleChange({ selectedMonth: Number(e.target.value) }); }}
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
            </form>
            <div style={{ height: 300, width: '100%' }}>
                <DataGrid
                    sx={{ textTransform: 'capitalize' }}
                    rows={paymentDetails}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    columnVisibilityModel={columnVisibilityModel}
                    onColumnVisibilityModelChange={(newModel) =>
                        setColumnVisibilityModel(newModel)
                    }
                />
            </div>
            <div className='payment-footer'>
                <div className='footer-cell'><span>Total advance received:</span> {total}</div>
                <div className='footer-cell'><span>Balance salary:</span> {balance}</div>
                <div>
                    <FormControl className='form-field'>
                        <TextField label="Number of days leave" variant="outlined"
                            name="lop"
                            value={lopDays}
                            onChange={handleLopChange}
                        />
                    </FormControl>
                </div>
            </div>
        </>
    )
}

export default PaymentDetails;