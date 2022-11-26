import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useNotification from '../common/hooks/useNotification';
import { createFees, getFeesByStudentId } from '../services/api.service';
import AddFeesForm from './addFeesForm';

const columns = [
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'month', headerName: 'Month', width: 100 },
    { field: 'for', headerName: 'For', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 100 }
]

const StudentDetails = () => {
    const [addNewForm, setAddNewForm] = useState(false);
    const [fees, setFees] = useState([]);
    const params = useParams();
    const { addNotification } = useNotification();

    useEffect(() => {
        getFees();
    }, [])

    const getFees = async () => {
        const studentId = Number(params.studentId);
        const response = await getFeesByStudentId(studentId);
        setFees(response);
    }

    const saveFees = async (fees) => {
        await createFees({ ...fees, studentId: Number(params.studentId) });
        getFees();
        addNotification('Fees saved successfully', 'success');
        setAddNewForm(false);
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Details of {params.studentId}
                    </Typography>
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{ textTransform: "capitalize" }}
                            rows={fees}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                        />
                    </div>
                    {addNewForm &&
                        <>
                            <Typography sx={{ fontSize: 14, paddingTop: '10px', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Add fees
                            </Typography>
                            <AddFeesForm saveFees={saveFees} />
                        </>
                    }
                </CardContent>
                <CardActions>
                    {!addNewForm &&
                        <Button variant="contained" onClick={() => { setAddNewForm(true); }}>Add Fees</Button>
                    }
                </CardActions>
            </Card>
        </>
    )
}

export default StudentDetails;