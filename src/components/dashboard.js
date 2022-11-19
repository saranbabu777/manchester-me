import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthentication from '../common/hooks/useAuthentication';
import StaffDashboard from './staffDashboard';
import UserList from './userList';

const Dashboard = () => {
    const { auth, permission } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth) {
            navigate(`/login`);
        }
    }, [])

    return (
        <>
            {auth?.role === permission.ADMIN &&
                <UserList />
            }
            {auth?.role === permission.STAFF &&
                <StaffDashboard />
            }
        </>
    )
}

export default Dashboard;