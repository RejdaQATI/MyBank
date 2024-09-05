// src/pages/MyAccount.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/myaccount.css';

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', email: '' });
  const userId = localStorage.getItem('userId'); 
  const token = localStorage.getItem('token'); 

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setFormValues({ name: response.data.name, email: response.data.email });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [userId, token]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/users/${userId}`, formValues, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false); 
      setUser({ ...user, ...formValues }); 
      localStorage.setItem('userName', formValues.name);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your account?')) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Account deleted successfully');
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="account-container">
      <h3>My Account</h3>

      {!isEditing ? (
        <div className="user-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
          <button onClick={handleDelete} className="delete-btn">Delete Account</button>
        </div>
      ) : (
        <form onSubmit={handleUpdate} className="edit-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="save-btn">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
        </form>
      )}
    </div>
  );
};

export default MyAccount;
