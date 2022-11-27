import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../common/hooks/useAuthentication';
import useNotification from '../common/hooks/useNotification';
import { createStudent, deleteStudent, getLastStudentRecord, getStudents } from '../services/api.service';
import AddStudentForm from './addStudentForm';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { field: 'studentId', headerName: 'Reg. No', width: 100 },
    { field: 'name', headerName: 'Name', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    {
        field: "doj",
        headerName: "Date of Joining",
        width: 150,
        renderCell: (params) => {
            return params.value ? params.value.toDate().toDateString() : '';
        }
    },
    { field: 'active', headerName: 'Active', width: 100 },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        renderCell: (params) => {
            const onClick = async (e) => {
                e.stopPropagation();
                alert('Row will get deleted!');
                await deleteStudent(params.id);
            };
            return <Button onClick={onClick}><DeleteIcon /></Button>;
        }
    }
]

const Academy = () => {
    const [students, setStudents] = useState([]);
    const [addNewForm, setAddNewForm] = useState(false);
    const navigate = useNavigate();
    const { addNotification } = useNotification();
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({ action: false });
    const { auth, permission } = useAuthentication();

    useEffect(() => {
        getList();
        /*Enable delete button for Admin*/
        if (auth?.role === permission.ADMIN) {
            setColumnVisibilityModel(({ action: true }));
        }
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
                            sx={{ textTransform: 'capitalize' }}
                            rows={students}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            onRowClick={(e) => getStudentDetails(e.row.studentId)}
                            columnVisibilityModel={columnVisibilityModel}
                            onColumnVisibilityModelChange={(newModel) =>
                                setColumnVisibilityModel(newModel)
                            }
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