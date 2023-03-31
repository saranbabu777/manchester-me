import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid } from '@mui/x-data-grid';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import useNotification from '../common/hooks/useNotification';
import { createTransaction, deleteTransaction, getTransactions } from '../services/api.service';
import TransactionForm from './transactionForm';
import TransactionListFooter from './transactionListFooter';

const TransactionList = () => {

    const columns = [
        { field: 'date', headerName: 'Date', width: 100 },
        { field: 'description', headerName: 'Description', width: 250, cellClassName: 'transaction-desc-cell' },
        { field: 'type', headerName: 'Type' },
        { field: 'cash', headerName: 'Cash' },
        { field: 'online', headerName: 'Online' },
        { field: 'playspots', headerName: 'Playspots' },
        { field: 'remarks', headerName: 'Remarks', width: 150 },
        {
            field: 'total',
            headerName: 'Total',
            renderCell: (params) =>
                parseFloat(
                    parseFloat(params.row.cash) +
                    parseFloat(params.row.online) +
                    parseFloat(params.row.playspots)
                ).toFixed(2)
        },
        { field: 'lastUpdatedBy', headerName: 'Last Updated By', width: 150, cellClassName: 'transaction-email-cell' },
        {
            field: "delete",
            headerName: "Delete",
            sortable: false,
            renderCell: (params) => {
                const onClick = async (e) => {
                    e.stopPropagation();
                    alert('Transaction will get deleted!');
                    await deleteTransaction(params.id);
                    await fetchTransactions();
                };
                return <Button onClick={onClick}><DeleteIcon /></Button>;
            }
        }
    ]

    const [transactions, setTransactions] = useState([]);
    const [transactionStartDate, setTransactionStartDate] = useState(new Date());
    const [transactionEndDate, setTransactionEndDate] = useState(new Date());
    const [showTransactionForm, setShowTransactionForm] = useState(false);

    const { addNotification } = useNotification();

    useEffect(() => {
        fetchTransactions();
    }, [transactionEndDate])

    const fetchTransactions = async () => {
        const startDate = new Date(transactionStartDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(transactionEndDate);
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 1);
        const transactions = await getTransactions(startDate, endDate);
        setTransactions(transactions);
    }

    const addTransaction = async (transaction) => {
        const eventDate = new Date(transaction.date);
        eventDate.setHours(0, 0, 0, 0);
        const listDate = new Date(transactionStartDate);
        listDate.setHours(0, 0, 0, 0);
        const newTransaction = await createTransaction(transaction);
        addNotification('Transaction saved successfully', 'success');
        setShowTransactionForm(false);
        if (listDate.getTime() === eventDate.getTime()) {
            setTransactions((prev) => {
                return [...prev, newTransaction]
            })
        }
    }

    const handleAddNewTransaction = () => {
        if (!showTransactionForm) {
            /*Disable start/end dates and set it to current date*/
            const today = new Date();
            setTransactionStartDate(today);
            setTransactionEndDate(today);
        }
        setShowTransactionForm(prev => !prev);
    }

    const gridRows = transactions.map(transaction => {
        let { description, type, startTime, endTime, date, lastUpdatedBy } = transaction;
        if (type === 'game') {
            startTime = startTime?.toDate()
                ?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
            endTime = endTime?.toDate()
                ?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true });
            description = `${startTime?.toLowerCase()} - ${endTime?.toLowerCase()}`
        }
        date = date?.toDate()?.toLocaleDateString("en-GB");
        lastUpdatedBy = lastUpdatedBy.split('@')[0]
        return {
            ...transaction,
            date,
            lastUpdatedBy,
            description
        }
    })

    const totalCash = transactions.reduce((prev, current) => {
        const total = (current.type === 'expense') ? prev - parseFloat(current.cash) : prev + parseFloat(current.cash);
        return total;
    }, 0)

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        <div className='transaction-list-filter'>
                            <div className='date-picker'>
                                <DesktopDatePicker
                                    label="From Date"
                                    inputFormat="dd/MM/yyyy"
                                    name="startDate"
                                    value={transactionStartDate}
                                    disabled={showTransactionForm}
                                    onChange={(e) => { setTransactionStartDate(e); setTransactionEndDate(e); }}
                                    renderInput={(params) => <TextField name="startDate" {...params} />}
                                />
                            </div>
                            <div className='date-picker'>
                                <DesktopDatePicker
                                    label="To Date"
                                    inputFormat="dd/MM/yyyy"
                                    name="endDate"
                                    value={transactionEndDate}
                                    disabled={showTransactionForm}
                                    onChange={(e) => { setTransactionEndDate(e) }}
                                    renderInput={(params) => <TextField name="endDate" {...params} />}
                                />
                            </div>
                        </div>
                        {!showTransactionForm &&
                            <>
                                <Typography sx={{ fontSize: 14, padding: '15px', margin: 0, fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                    Transactions on {transactionStartDate?.toDateString()}
                                </Typography>
                                <div style={{ height: 300, width: '100%' }}>
                                    <DataGrid
                                        sx={{ textTransform: 'capitalize' }}
                                        rows={gridRows}
                                        columns={columns}
                                        disableSelectionOnClick
                                        components={{
                                            Footer: TransactionListFooter
                                        }}
                                        componentsProps={{
                                            footer: { totalCash }
                                        }}
                                    />
                                </div>
                            </>
                        }
                        <CardActions>
                            <Button variant="contained" onClick={handleAddNewTransaction}>
                                {showTransactionForm ? 'Go Back' : 'Add New'}
                            </Button>
                        </CardActions>
                        {showTransactionForm &&
                            <TransactionForm addTransaction={addTransaction} defaultDate={transactionStartDate} />
                        }
                    </CardContent>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default TransactionList;