import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import { createAudit } from '../services/api.service';

const CreateAuditDialog = ({ handleClose, open, audit }) => {

    const [remarks, setRemarks] = useState('')

    const handleAuditSave = async () => {
        await createAudit({ ...audit, remarks });
        setRemarks('');
        handleClose();
    }

    const handleChange = (e) => {
        setRemarks(e.target.value)
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Mark as Settled</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you want to settle the transactions
                    from {audit.transactionStartDate?.toDateString()} to {audit.transactionEndDate?.toDateString()}.
                </DialogContentText>
                <TextField
                    label="Remarks"
                    ariant="outlined"
                    name="remarks"
                    value={remarks}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    fullWidth
                    margin="normal"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleAuditSave}>
                    Yes
                </Button>
                <Button variant="contained" onClick={handleClose}>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateAuditDialog;