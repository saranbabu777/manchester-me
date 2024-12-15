import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuthentication from '../common/hooks/useAuthentication';
import useNotification from '../common/hooks/useNotification';
import { createFees, getFeesByStudentId, deleteFees, getStudentByStudentId, updateStudent, createStudentAttendance, filterStudentAttendance } from '../services/api.service';
import AddFeesForm from './addFeesForm';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddStudentForm from './addStudentForm';
import PendingFees from './pendingFees';
import useLoader from '../common/hooks/useLoader';
import StudentAttendanceForm from './studentAttendanceForm';
import Calendar from './calendar';

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
    const [markAttendanceForm, setMarkAttendanceForm] = useState(false);
    const [fees, setFees] = useState([]);
    const [student, setStudent] = useState({});
    const [editStudentForm, setEditStudentForm] = useState(false);
    const params = useParams();
    const { addNotification } = useNotification();
    const { showLoader, hideLoader } = useLoader();
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
        try{
            showLoader();
            if (fees.for && fees.month && fees.year) {
                await createFees({ ...fees, studentId: Number(params.studentId) });
                getFees();
                hideLoader();
                addNotification('Fees saved successfully', 'success');
                setAddNewForm(false);
            } else {
                hideLoader();
                addNotification('Please fill all required fields', 'error');
            }
        } catch(e){
            console.log(e);
            hideLoader();
        }
    }

    const saveAttendance = async (attendance) => {
        try{
            showLoader();
            const studentId = Number(params.studentId);
            const startDate = new Date(attendance.date);
            startDate.setHours(0, 0, 0, 0);
            const endDate = new Date(attendance.date);
            endDate.setHours(0, 0, 0, 0);
            endDate.setDate(endDate.getDate() + 1);
            const existingRecords = await filterStudentAttendance(studentId, startDate, endDate);
            if (existingRecords.length === 0) {
                await createStudentAttendance({...attendance, studentId});
                hideLoader();
                addNotification('Attendance saved successfully', 'success')
                setMarkAttendanceForm(false);
            } else {
                hideLoader();
                addNotification('Attendance record already exist', 'error')
            }
        } catch(e){
            console.log(e);
            hideLoader();
        }
    }

    const toggleEditForm = () => {
        setEditStudentForm(editForm => !editForm);
    }

    const saveStudent = async (event) => {
        if (!event.name || !event.phone || !event.dob || !event.doj) {
            addNotification('Please fill all required fields', 'error');
            return;
        }
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
                    {markAttendanceForm &&
                        <>
                            <Typography sx={{ fontSize: 14, paddingTop: '10px', fontWeight: 'bold' }} color="text.secondary" gutterBottom>
                                Attendance
                            </Typography>
                            <Calendar studentId={Number(params.studentId)} />
                            <StudentAttendanceForm onSubmit={saveAttendance} />
                        </>
                    }
                </CardContent>
                <CardActions>
                    {!addNewForm &&
                        <Button variant="contained" onClick={() => { setAddNewForm(true); }}>Add Fees</Button>
                    }
                    {!markAttendanceForm &&
                        <Button variant="contained" onClick={() => { setMarkAttendanceForm(true); }}>Attendance</Button>
                    }
                </CardActions>
            </Card>
        </>
    )
}

export default StudentDetails;