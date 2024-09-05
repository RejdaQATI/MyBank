import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Transactions from './pages/Transactions';
import Myaccount from './pages/Myaccount'; 
import Dashboard from './pages/Dashboard'; 
import AddTransaction from './pages/AddTransaction'; 
import Menu from './components/Menu';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/dashboard" />;
  }

  return element;
};

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route index element={token ? <Home /> : <Navigate to="/dashboard" />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="transactions" element={<ProtectedRoute element={<Transactions />} />} />
          <Route path="my-account" element={<ProtectedRoute element={<Myaccount />} />} />
          <Route path="add-transaction" element={<ProtectedRoute element={<AddTransaction />} />} />
        </Route>
      </Routes>
    </Router>
  );
}

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Menu />}>
//           <Route index element={<Home />} />
//           <Route path="login" element={<Login />} />
//           <Route path="register" element={<Register />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="transactions" element={<Transactions />} />
//           <Route path="my-account" element={<Myaccount />} />
//           <Route path="add-transaction" element={<AddTransaction />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

export default App;
