import React from 'react';
import useAuthentication from '../common/hooks/useAuthentication';
import StaffDashboard from './staffDashboard';
import UserList from './userList';

const Dashboard = () => {
    const { auth, permission } = useAuthentication();
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