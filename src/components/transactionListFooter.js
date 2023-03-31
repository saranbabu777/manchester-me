import { Box } from '@mui/material';
import React from 'react';

const TransactionListFooter = ({ total }) => {
    return (
        <Box sx={{ padding: "10px", display: "flex", justifyContent: "flex-end", fontWeight: "bold", gap: "25px" }}>
            <div>Total Cash: {parseFloat(total.cash).toFixed(2)}</div>
            <div>Total Online: {parseFloat(total.online).toFixed(2)}</div>
        </Box>
    )
}

export default TransactionListFooter;