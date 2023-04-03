import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthentication from '../common/hooks/useAuthentication';
import useNotification from '../common/hooks/useNotification';
import { createFees, getFeesByStudentId, deleteFees, getStudentByStudentId, updateStudent } from '../services/api.service';
import AddFeesForm from './addFeesForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddStudentForm from './addStudentForm';
import PendingFees from './pendingFees';

const monthShortNames = [`jan`, `feb`, `mar`, `apr`, `may`, `jun`,
    `jul`, `aug`, `sep`, `oct`, `nov`, `dec`];
const columns = [
    { field: 'year', headerName: 'Year', width: 100 },
    {
        field: 'month',
        headerName: 'Month',
        width: 100,
        sortComparator: (a, b) => (monthShortNames.indexOf(a) - monthShortNames.indexOf(b))
    },
    { field: 'for', headerName: 'For', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 100 },
    {
        field: "date",
        headerName: "Date Of Payment",
        width: 150,
        renderCell: (params) => {
            return params.value ? params.value.toDate().toDateString() : '';
        }
    },
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
    const [student, setStudent] = useState({});
    const [editStudentForm, setEditStudentForm] = useState(false);
    const params = useParams();
    const { addNotification } = useNotification();
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({ action: false });
    const { auth, permission } = useAuthentication();

    useEffect(() => {
        getStudentDetails();
        getFees();
        /*Enable delete button for Admin*/
        if (auth?.role === permission.ADMIN) {
            setColumnVisibilityModel(({ action: true }));
        }
    }, [])

    const getStudentDetails = async () => {
        const studentDetails = await getStudentByStudentId(Number(params.studentId));
        if (studentDetails.length)
            setStudent(studentDetails[0]);
    }

    const getFees = async () => {
        const studentId = Number(params.studentId);
        const response = await getFeesByStudentId(studentId);
        response.sort((a, b) => {
            return Number(b.year) - Number(a.year) || monthShortNames.indexOf(a.month) - monthShortNames.indexOf(b.month);
        })
        setFees(response);
    }

    const saveFees = async (fees) => {
        if (fees.for && fees.month && fees.year) {
            await createFees({ ...fees, studentId: Number(params.studentId) });
            getFees();
            addNotification('Fees saved successfully', 'success');
            setAddNewForm(false);
        } else {
            addNotification('Please fill all required fields', 'error');
        }
    }

    const toggleEditForm = () => {
        setEditStudentForm(editForm => !editForm);
    }

    const saveStudent = async (event) => {
        await updateStudent(student.id, event);
        getStudentDetails();/*update student state*/
        addNotification('Student saved successfully', 'success');
        setEditStudentForm(false);
    }

    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14, textTransform: "capitalize", fontWeight: "bold" }} color="text.secondary" gutterBottom>
                        {student.name} <Button onClick={toggleEditForm}><EditIcon /></Button>
                    </Typography>
                    {editStudentForm &&
                        <div style={{ paddingBottom: '10px' }}>
                            <AddStudentForm saveStudent={saveStudent} editMode={true} student={student} />
                        </div>
                    }
                    <Typography sx={{ fontSize: 14, paddingTop: '10px', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                        Fees Pending
                    </Typography>
                    <PendingFees fees={fees} />
                    <div style={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{ textTransform: "capitalize" }}
                            rows={fees}
                            columns={columns}
                            pageSize={20}
                            rowsPerPageOptions={[20]}
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