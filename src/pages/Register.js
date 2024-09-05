// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style/register.css'; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrors({});
        setSuccessMessage('');

        axios.post('http://localhost:8000/api/register', {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        })
        .then(response => {
            if (response.data.status) {
                setSuccessMessage(response.data.message);
                localStorage.setItem('token', response.data.token);
            }
        })
        .catch(error => {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        });
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form className="register-form" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="error-message">{errors.name[0]}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="error-message">{errors.email[0]}</p>}
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <p className="error-message">{errors.password[0]}</p>}
                </div>
                <div>
                    <label htmlFor="password_confirmation">Confirm Password:</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
                    />
                    {errors.password_confirmation && <p className="error-message">{errors.password_confirmation[0]}</p>}
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;
