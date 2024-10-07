import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8000/api/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userName', response.data.user.name); 
        localStorage.setItem('userId', response.data.user.id);
        navigate('/'); 
      })
      .catch(error => {
        setErrorMessage('Invalid email or password. Please try again.');
        console.error('Error logging in:', error);
      });
  };

  return (
    <div 
      className="relative flex items-center justify-center h-screen w-full bg-cover bg-center" 
      style={{ backgroundImage: `url('./images/background-login.jpg')` }} // Remplace par ton image
    >
      {/* Overlay sombre */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      {/* Formulaire de login avec transparence */}
      <form 
        onSubmit={handleSubmit} 
        className="relative bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-sm z-10"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Login</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="mb-6">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition">
          Login
        </button>
        <p className="mt-4 text-gray-400 text-center">
          Don't have an account? <a href="/register" className="text-white underline">Sign up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
