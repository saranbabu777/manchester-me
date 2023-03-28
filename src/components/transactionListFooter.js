import { Box } from '@mui/material';
import React from 'react';

const TransactionListFooter = (props) => {
    return (
        <Box sx={{ padding: "10px", display: "flex", justifyContent: "flex-end", fontWeight: "bold" }}>Total Cash: {props.totalCash}</Box>
    )
}

export default TransactionListFooter;