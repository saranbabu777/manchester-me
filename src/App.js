import './App.scss';
import { Route, Routes } from "react-router-dom";
import UserList from './components/userList';
import AddUser from './components/addUser';
import AddPayment from './components/addPayment';
import Attendance from './components/attendance';
import PaymentDetails from './components/paymentDetails';
import UserDetails from './components/userDetails';
import Header from './components/header';
import { ThemeProvider } from '@mui/material';
import { darkTheme } from './theme';
import Login from './components/login';
import StaffDashboard from './components/staffDashboard';
import ManageLeave from './components/manageLeave';
import Salary from './components/salary';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Header />
        <div className='main-content'>
          <Routes>
            <Route exact path="/" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/user-details/:email" element={<UserDetails />} />
            <Route path="/add-payment" element={<AddPayment />} />
            <Route path="/dashboard" element={<StaffDashboard />} />
            <Route path="/manage-leave" element={<ManageLeave />} />
            <Route path="/salary" element={<Salary />} />
            <Route path="/attendance/:status" element={<Attendance />} />
          </Routes>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
