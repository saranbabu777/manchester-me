import './App.css';
import { Link, Route, Routes } from "react-router-dom";
import UserList from './components/userList';
import AddUser from './components/addUser';
import AddPayment from './components/addPayment';
import Attendance from './components/attendance';
import Dashboard from './components/dashboard';
import PaymentDetails from './components/paymentDetails';
import UserDetails from './components/userDetails';

function App() {
  return (
    <div className="App">
      <div>
        <div>
          <Link to="/">
            User List
          </Link>
        </div>
        <div>
          <Link to="/add-payment">
            Add payment
          </Link>
        </div>
        <div>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/user-details/:email" element={<UserDetails />} />
        <Route path="/add-payment" element={<AddPayment />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
      </Routes>
    </div>
  );
}

export default App;
