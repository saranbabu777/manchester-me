import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFeesByStudentId } from '../services/api.service';

const columns = [
    { field: 'year', headerName: 'Year', width: 150 },
    { field: 'month', headerName: 'Month', width: 150 },
    { field: 'for', headerName: 'For', width: 110 },
    { field: 'amount', headerName: 'Amount', width: 110 }
]

const StudentDetails = () => {
    const [student, setStudent] = useState({});
    const [fees, setFees] = useState([]);
    const params = useParams();

    useEffect(() => {
        const studentId = Number(params.studentId);
        const getFees = async () => {
            const response = await getFeesByStudentId(studentId);
            console.log(response)
            setFees(response);
        }
        getFees();
    }, [])

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Details of {params.studentId}
                    </Typography>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={fees}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={() => { }}>Add Fees</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default StudentDetails;