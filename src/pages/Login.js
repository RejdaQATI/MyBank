import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/login.css'; 

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
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Login</button>
        <a href="/register">Don't have an account? Sign up</a>
      </form>
    </div>
  );
};

export default Login;
