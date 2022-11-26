import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthentication from '../common/hooks/useAuthentication';
import useNotification from '../common/hooks/useNotification';
import { createFees, getFeesByStudentId, deleteFees } from '../services/api.service';
import AddFeesForm from './addFeesForm';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'month', headerName: 'Month', width: 100 },
    { field: 'for', headerName: 'For', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    { field: 'date', headerName: 'Date Of Payment', width: 150 },
    { field: 'lastUpdatedBy', headerName: 'Last Updated By', width: 250 },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
            const onClick = async (e) => {
                e.stopPropagation();
                alert('Row will get deleted!');
                await deleteFees(params.id);
            };
            return <Button onClick={onClick}><DeleteIcon /></Button>;
        }
    }
]

const StudentDetails = () => {
    const [addNewForm, setAddNewForm] = useState(false);
    const [fees, setFees] = useState([]);
    const params = useParams();
    const { addNotification } = useNotification();
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({ action: false });
    const { auth, permission } = useAuthentication();

    useEffect(() => {
        getFees();
        /*Enable delete button for Admin*/
        if (auth?.role === permission.ADMIN) {
            setColumnVisibilityModel(({ action: true }));
        }
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
                            columnVisibilityModel={columnVisibilityModel}
                            onColumnVisibilityModelChange={(newModel) =>
                                setColumnVisibilityModel(newModel)
                            }
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