// src/components/Menu.js
import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import BalanceDisplay from './BalanceDisplay';
import WelcomeMessage from './Welcome';
import IncomeExpenseChart from './IncomeExpenseChart'; 
import '../style/menu.css';

const Menu = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/dashboard');
  };

  return (
    <div className="menu-container">
      {!hideSidebar && (
        <aside className="menu-sidebar">
          <ul className="menu-list">
            {token && (
              <>
               <li className="menu-item">
              <Link to="/" className="menu-link">
                Home
              </Link>
            </li>
                <li className="menu-item">
                  <Link to="/transactions" className="menu-link">
                    Transactions
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/my-account" className="menu-link">
                    My Account
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/add-transaction" className="menu-link">
                    Add a new transaction
                  </Link>
                </li>
              </>
            )}
            {!token && (
              <>
              <li className="menu-item">
                  <Link to="/dashboard" className="menu-link">
                    Welcome
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/login" className="menu-link">
                    Login
                  </Link>
                </li>
                
                <li className="menu-item">
                  <Link to="/register" className="menu-link">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </aside>
      )}
      <main className="menu-content">
        {token && (
          <>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
            <WelcomeMessage /> 

          </>
        )}
        <Outlet /> 
      </main>
    </div>
  );
};

export default Menu;
