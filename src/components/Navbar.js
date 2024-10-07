import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="text-white py-4 px-8 flex justify-between items-center w-full fixed top-0 z-50 bg-transparent">
      {/* Left part can be empty or you can add a logo or home link */}
      <div></div>

      {/* Login link (right side) */}
      <div>
        <Link
          to="/login"
          className="text-lg font-bold hover:text-gray-400 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
