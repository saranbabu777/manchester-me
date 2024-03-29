import { Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, TextField, Typography, darken } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { useEffect, useState } from 'react';
import useNotification from '../common/hooks/useNotification';
import { createTransaction, deleteTransaction, getLatestAuditDetails, getTransactions, updateTransaction } from '../services/api.service';
import TransactionForm from './transactionForm';
import TransactionListFooter from './transactionListFooter';
import CreateAuditDialog from './createAuditDialog';
import useAuthentication from '../common/hooks/useAuthentication';
import styled from '@emotion/styled';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .transaction-grid-theme--expense': {
        color: darken(theme.palette.error.main, 0.1),
    }
}));

const TransactionList = () => {

    const columns = [
        { field: 'dateString', headerName: 'Date', width: 100 },
        { field: 'descriptionText', headerName: 'Description', width: 250, cellClassName: 'transaction-desc-cell' },
        { field: 'type', headerName: 'Type' },
        { field: 'cash', headerName: 'Cash' },
        { field: 'online', headerName: 'Online' },
        { field: 'playspots', headerName: 'Playspots' },
        { field: 'remarks', headerName: 'Remarks', width: 150 },
        { field: 'total', headerName: 'Total' },
        { field: 'lastUpdatedBy', headerName: 'Last Updated By', width: 150, cellClassName: 'transaction-email-cell' },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 150,
            renderCell: (params) => {
                const deleteRow = async (e) => {
                    e.stopPropagation();
                    alert('Transaction will get deleted!');
                    await deleteTransaction(params.id);
                    await fetchTransactions();
                };
                const editRow = async (e) => {
                    e.stopPropagation();
                    editTransaction(params.id, params.row);
                }
                const disabledActions = unsettledDate && new Date(params.row.date).getTime() < new Date(unsettledDate).getTime();
                return (
                    <>
                        <Button onClick={editRow} disabled={disabledActions}><EditIcon /></Button>
                        <Button onClick={deleteRow} disabled={disabledActions}><DeleteIcon /></Button>
                    </>
                );
            }
        }
    ]

    const [transactions, setTransactions] = useState([]);
    const [transactionStartDate, setTransactionStartDate] = useState(new Date());
    const [transactionEndDate, setTransactionEndDate] = useState(new Date());
    const [showTransactionForm, setShowTransactionForm] = useState(false);
    const [editRowData, setEditRowData] = useState({});
    const [openAuditDialog, setOpenAuditDialog] = useState(false);
    const [unsettledDate, setUnsettledDate] = useState(null);
    const [privateTransactions, setPrivateTransactions] = useState(false);

    const { auth, permission } = useAuthentication();
    const { addNotification } = useNotification();

    useEffect(() => {
        fetchTransactions();
    }, [transactionEndDate, privateTransactions])

    useEffect(() => {
        const getAuditRecords = async () => {
            const records = await getLatestAuditDetails();
            if (records.length > 0) {
                const auditLastDate = new Date(records[0].transactionEndDate.toDate());
                auditLastDate.setHours(0, 0, 0, 0);
                auditLastDate.setDate(auditLastDate.getDate() + 1);
                setUnsettledDate(auditLastDate);
            }
        }
        getAuditRecords();
    }, [])

    const fetchTransactions = async () => {
        const startDate = new Date(transactionStartDate);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(transactionEndDate);
        endDate.setHours(0, 0, 0, 0);
        endDate.setDate(endDate.getDate() + 1);
        const transactions = await getTransactions(startDate, endDate, privateTransactions);
        setTransactions(transactions);
    }

    const addTransaction = async (transaction) => {
        if (transaction.id) {
            await updateTransaction(transaction.id, transaction);
        } else {
            const { id, ...restOfPayload } = transaction;
            await createTransaction(restOfPayload);
        }
        addNotification('Transaction saved successfully', 'success');
        await fetchTransactions();
        setShowTransactionForm(false);
    }

    const handleAddNewTransaction = () => {
        if (showTransactionForm) {
            setEditRowData({});
        }
        setShowTransactionForm(prev => !prev);
    }

    const editTransaction = (id, data) => {
        setEditRowData({ ...data, id });
        setShowTransactionForm(true);
    }

    const handleSettledClick = () => {
        setOpenAuditDialog(true);
    }

    const handleCloseAuditDialog = () => {
        setOpenAuditDialog(false);
    }

    const gridRows = transactions.map(transaction => {
        let { description, type, startTime, endTime, date, lastUpdatedBy } = transaction;
        let descriptionText = description;
        if (type === 'game') {
            startTime = startTime?.toDate();
            const startTimeString = startTime?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            endTime = endTime?.toDate();
            const endTimeString = endTime?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            descriptionText = `${startTimeString?.toLowerCase()} - ${endTimeString?.toLowerCase()}`
        }
        date = date?.toDate();
        const dateString = date?.toLocaleDateString("en-GB");
        lastUpdatedBy = lastUpdatedBy.split('@')[0];
        const total = parseFloat(
            parseFloat(transaction.cash) + parseFloat(transaction.online) + parseFloat(transaction.playspots)
        ).toFixed(2);
        return {
            ...transaction,
            date,
            startTime,
            endTime,
            dateString,
            lastUpdatedBy,
            descriptionText,
            total
        }
    })

    const total = transactions.reduce((prev, current) => {
        const total = {};
        total.cash = (current.type === 'expense') ? prev.cash - parseFloat(current.cash) : prev.cash + parseFloat(current.cash);
        total.online = (current.type === 'expense') ? prev.online - parseFloat(current.online) : prev.online + parseFloat(current.online);
        return total;
    }, { cash: 0, online: 0 })

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <CardContent>
                        {(auth?.role === permission.ADMIN) &&
                            <div>
                                <FormControlLabel control={
                                    <Checkbox
                                        sx={{ margin: '15px 0' }}
                                        checked={privateTransactions}
                                        onChange={(e) => { setPrivateTransactions(e.target.checked) }}
                                    />
                                } label="Include Private Transactions" />
                            </div>
                        }
                        <div className='transaction-list-filter'>
                            <div className='date-picker'>
                                <DesktopDatePicker
                                    label="From Date"
                                    inputFormat="dd/MM/yyyy"
                                    format="dd/MM/yyyy"
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
                                    format="dd/MM/yyyy"
                                    name="endDate"
                                    value={transactionEndDate}
                                    disabled={showTransactionForm}
                                    onChange={(e) => { setTransactionEndDate(e) }}
                                    renderInput={(params) => <TextField name="endDate" {...params} />}
                                />
                            </div>
                            {(auth?.role === permission.ADMIN) &&
                                <Button className='transform-none' variant="contained" onClick={handleSettledClick}>
                                    Settle
                                </Button>
                            }
                            <CreateAuditDialog open={openAuditDialog} handleClose={handleCloseAuditDialog} audit={{ transactionStartDate, transactionEndDate }} />
                        </div>
                        {!showTransactionForm &&
                            <>
                                <Typography sx={{ fontSize: 14, padding: '15px', margin: 0 }} color="text.secondary" gutterBottom>
                                    Transactions from {transactionStartDate?.toDateString()} to {transactionEndDate?.toDateString()}
                                </Typography>
                                <div style={{ height: 300, width: '100%' }}>
                                    <StyledDataGrid
                                        sx={{ textTransform: 'capitalize' }}
                                        getRowClassName={(params) => `transaction-grid-theme--${params.row.type}`}
                                        rows={gridRows}
                                        columns={columns}
                                        disableSelectionOnClick
                                        components={{
                                            Footer: TransactionListFooter
                                        }}
                                        componentsProps={{
                                            footer: { total }
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
                            <TransactionForm addTransaction={addTransaction} transaction={editRowData} />
                        }
                    </CardContent>
                </LocalizationProvider>
            </Card>
        </>
    )
}

export default TransactionList;