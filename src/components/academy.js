import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../common/hooks/useAuthentication';
import useNotification from '../common/hooks/useNotification';
import { createStudent, deleteStudent, getLastStudentRecord, getStudents } from '../services/api.service';
import AddStudentForm from './addStudentForm';
import DeleteIcon from '@mui/icons-material/Delete';
import { darken, lighten, styled } from '@mui/material/styles';
import useLoader from '../common/hooks/useLoader';

const getBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
    mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    '& .students-grid-theme--Inactive': {
        backgroundColor: getBackgroundColor(theme.palette.error.main, theme.palette.mode),
        '&:hover': {
            backgroundColor: getHoverBackgroundColor(
                theme.palette.error.main,
                theme.palette.mode,
            ),
        }
    }
}));

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
    const { showLoader, hideLoader } = useLoader();
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
        showLoader();
        const response = await getStudents();
        setStudents(response.map(x => ({ ...x, active: x.active ? 'Active' : 'Inactive' })));
        hideLoader();
    }

    const getStudentDetails = (studentId) => {
        navigate(`/student/${studentId}`);
    }

    const saveStudent = async (student) => {
        if (!student.name || !student.phone || !student.dob || !student.doj) {
            addNotification('Please fill all required fields', 'error');
            return;
        }
        try{
            showLoader();
            const lastRecord = await getLastStudentRecord();
            if (lastRecord) {
                const lastId = (lastRecord.length > 0) ? Number(lastRecord[0].studentId) : 0;
                const studentId = lastId + 1;
                await createStudent({ ...student, studentId });
                getList();
                hideLoader();
                addNotification('Student saved successfully', 'success');
                setAddNewForm(false);
            } else {
                hideLoader();
                addNotification('Unable to save student!', 'error');
            }
        } catch(e){
            console.log(e)
            hideLoader();
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
                        <StyledDataGrid
                            initialState={{
                                sorting: {
                                    sortModel: [{ field: 'active', sort: 'asc' }],
                                },
                            }}
                            getRowClassName={(params) => `students-grid-theme--${params.row.active}`}
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