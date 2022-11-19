import './App.scss';
import { Navigate, Route, Routes } from "react-router-dom";
import AddUser from './components/addUser';
import AddPayment from './components/addPayment';
import Attendance from './components/attendance';
import UserDetails from './components/userDetails';
import Header from './components/header';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme';
import Login from './components/login';
import ManageLeave from './components/manageLeave';
import Salary from './components/salary';
import NotificationProvider from './common/providers/notificationProvider';
import Notification from './components/notification';
import AuthProvider from './common/providers/authProvider';
import Dashboard from './components/dashboard';
import { PrivateRoute } from './components/privateRoute';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <AuthProvider>
          <NotificationProvider>
            <Header />
            <div className='main-content'>
              <Routes>
                <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-user" element={<PrivateRoute><AddUser /></PrivateRoute>} />
                <Route path="/user-details/:email" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
                <Route path="/add-payment" element={<PrivateRoute><AddPayment /></PrivateRoute>} />
                <Route path="/manage-leave" element={<PrivateRoute><ManageLeave /></PrivateRoute>} />
                <Route path="/salary" element={<PrivateRoute><Salary /></PrivateRoute>} />
                <Route path="/attendance/:status" element={<PrivateRoute><Attendance /></PrivateRoute>} />
                <Route path="/attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </div>
            <Notification />
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
