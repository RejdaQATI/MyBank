import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({ name: '', email: '' });
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

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
    console.log('Update button clicked!');
    console.log('Form values:', formValues); // Ajoute ceci pour voir les valeurs
    try {
      // Envoi des nouvelles informations à l'API
      const response = await axios.put(`http://localhost:8000/api/users/${userId}`, formValues, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Mettre à jour les informations de l'utilisateur dans l'état
      const updatedUser = response.data; // S'assurer que l'API renvoie les données mises à jour
      setUser(updatedUser);

      // Mettre à jour le localStorage si nécessaire
      localStorage.setItem('userName', updatedUser.name);

      // Désactiver le mode édition
      setIsEditing(false);
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
        navigate('/login'); // Redirection après suppression du compte
      } catch (error) {
        console.error('Error deleting account:', error);
      }
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-start justify-center h-screen w-full bg-gray-900">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-md mt-16">
        <h3 className="text-3xl font-bold text-white mb-6 text-center">My Account</h3>

        {!isEditing ? (
          <div className="space-y-4">
            <p className="text-white">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="text-white">
              <strong>Email:</strong> {user.email}
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full bg-red-600 text-white py-2 rounded-md font-bold hover:bg-red-700 transition"
              >
                Delete Account
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md font-bold hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="w-full bg-gray-500 text-white py-2 rounded-md font-bold hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MyAccount;
