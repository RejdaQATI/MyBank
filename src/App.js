import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Transactions from './pages/Transactions';
import MyAccount from './pages/Myaccount';  
import Dashboard from './pages/Dashboard';
import AddTransaction from './pages/AddTransaction';
import Menu from './components/Menu';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Menu />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/transactions"
            element={token ? <Transactions /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-account"
            element={token ? <MyAccount /> : <Navigate to="/login" />}
          />
          <Route
            path="/add-transaction"
            element={token ? <AddTransaction /> : <Navigate to="/login" />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
