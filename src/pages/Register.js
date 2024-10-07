import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

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

                // Redirection vers la page de connexion après succès
                navigate('/login'); 
            }
        })
        .catch(error => {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        });
    };

    return (
        <div 
            className="relative flex items-center justify-center h-screen w-full bg-cover bg-center" 
            style={{ backgroundImage: `url('./images/background-login.jpg')` }} // Remplace par ton image
        >
            {/* Overlay sombre */}
            <div className="absolute inset-0 bg-black opacity-70"></div>

            {/* Formulaire d'inscription avec transparence */}
            <form 
                onSubmit={handleSubmit} 
                className="relative bg-gray-900 bg-opacity-75 p-8 rounded-lg shadow-lg w-full max-w-sm z-10"
            >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Register</h2>
                {successMessage && <p className="mb-4 text-green-500 text-center">{successMessage}</p>}
                {errors.general && <p className="mb-4 text-red-500 text-center">{errors.general}</p>}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name[0]}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email[0]}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-2">{errors.password[0]}</p>}
                </div>
                <div className="mb-6">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-white mb-1">Confirm Password</label>
                    <input 
                        type="password" 
                        id="password_confirmation" 
                        value={passwordConfirmation} 
                        onChange={(e) => setPasswordConfirmation(e.target.value)} 
                        required 
                        className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                    {errors.password_confirmation && <p className="text-red-500 text-sm mt-2">{errors.password_confirmation[0]}</p>}
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
