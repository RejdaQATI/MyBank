import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import BalanceDisplay from './BalanceDisplay';
import WelcomeMessage from './Welcome';

const Menu = () => {
  const token = localStorage.getItem('token');
  const location = useLocation();
  const navigate = useNavigate();

  // Masquer la sidebar uniquement pour les pages de login et register
  const hideSidebar = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white relative">
      {!hideSidebar && (
        <aside className="w-64 bg-gray-800 h-screen p-5">
          <div className="mb-8">
            <img src="/images/real-logo.png" alt="Logo" className="w-full h-auto" />
          </div>
          <ul className="space-y-4">
            {token && (
              <>
                <li>
                  <Link to="/" className="block py-2 px-3 text-gray-300 hover:bg-gray-700 rounded-md">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/transactions" className="block py-2 px-3 text-gray-300 hover:bg-gray-700 rounded-md">
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link to="/my-account" className="block py-2 px-3 text-gray-300 hover:bg-gray-700 rounded-md">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link to="/add-transaction" className="block py-2 px-3 text-gray-300 hover:bg-gray-700 rounded-md">
                    Add a new transaction
                  </Link>
                </li>
              </>
            )}
          </ul>
        </aside>
      )}
      <main className="flex-1 p-6 overflow-auto relative">
        {token && (
          <>
            <div className="flex justify-between items-center  mt-2">
              <WelcomeMessage />
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md absolute top-4 right-4"
            >
              Logout
            </button>
            {location.pathname === '/' && (
              <>
                <BalanceDisplay />
              </>
            )}
          </>
        )}
        <Outlet />
      </main>
    </div>
  );
};

export default Menu;
