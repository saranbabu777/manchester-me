import './App.scss';
import { Route, Routes } from "react-router-dom";
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

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <AuthProvider>
          <NotificationProvider>
            <Header />
            <div className='main-content'>
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/add-user" element={<AddUser />} />
                <Route path="/user-details/:email" element={<UserDetails />} />
                <Route path="/add-payment" element={<AddPayment />} />
                <Route path="/manage-leave" element={<ManageLeave />} />
                <Route path="/salary" element={<Salary />} />
                <Route path="/attendance/:status" element={<Attendance />} />
                <Route path="/attendance" element={<Attendance />} />
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
