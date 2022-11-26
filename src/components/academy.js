import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudents } from '../services/api.service';

const columns = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'doj', headerName: 'Date of Joining', width: 110 },
    { field: 'active', headerName: 'Active', width: 110 }
]

const Academy = () => {
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getList();
    }, [])

    const getList = async () => {
        const response = await getStudents();
        setStudents(response.map(x => ({ ...x, active: x.active ? 'Active' : 'Inactive' })));
    }

    const getStudentDetails = (studentId) => {
        navigate(`/student/${studentId}`);
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Academy Students
                    </Typography>
                    <div style={{ height: 600, width: '100%' }}>
                        <DataGrid
                            rows={students}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            onRowClick={(e) => getStudentDetails(e.row.studentId)}
                        />
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" onClick={() => { }}>Create Student</Button>
                </CardActions>
            </Card>
        </>
    )
}

export default Academy;