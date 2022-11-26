import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useNotification from '../common/hooks/useNotification';
import { createStudent, getLastStudentRecord, getStudents } from '../services/api.service';
import AddStudentForm from './addStudentForm';

const columns = [
    { field: 'studentId', headerName: 'Reg. No', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    { field: 'doj', headerName: 'Date of Joining', width: 110 },
    { field: 'active', headerName: 'Active', width: 110 }
]

const Academy = () => {
    const [students, setStudents] = useState([]);
    const [addNewForm, setAddNewForm] = useState(false);
    const navigate = useNavigate();
    const { addNotification } = useNotification();

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

    const saveStudent = async (student) => {
        const lastRecord = await getLastStudentRecord();
        if (lastRecord[0].studentId) {
            const studentId = Number(lastRecord[0].studentId) + 1;
            await createStudent({ ...student, studentId });
            getList();
            addNotification('Student saved successfully', 'success');
            setAddNewForm(false);
        } else {
            addNotification('Unable to save student!', 'error');
        }
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
                    {addNewForm &&
                        <>
                            <Typography sx={{ fontSize: 14, paddingTop: '10px', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Add new student
                            </Typography>
                            <AddStudentForm saveStudent={saveStudent} />
                        </>
                    }
                </CardContent>
                <CardActions>
                    {!addNewForm &&
                        <Button variant="contained" onClick={() => { setAddNewForm(true); }}>Add Student</Button>
                    }
                </CardActions>
            </Card>
        </>
    )
}

export default Academy;