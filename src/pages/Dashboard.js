import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; 

const Dashboard = () => {
  return (
    <div className="relative h-screen w-full overflow-x-hidden bg-cover bg-center" style={{ backgroundImage: `url('/images/background.jpg')` }}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <Navbar />

      <div className="absolute top-1/2 left-20 transform -translate-y-1/2 z-10 max-w-lg px-5">
        <h1 className="text-5xl font-bold mb-5 text-white">
          "Managing expenses the way they should be"
        </h1>
        <h2 className="text-2xl mb-10 text-white">
          Take control of your finances effortlessly.
        </h2>
        <Link to="/login">
          <button className="px-8 py-4 text-lg font-bold text-black bg-white rounded-lg hover:bg-gray-200 transition">
            Try Expense Manager
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
