import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddNewTransaction = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income'); 

  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    
    if (!token) {
      console.error('User not authenticated');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/transactions', 
        { name, amount, description, type },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Transaction added:', response.data);

      setName('');
      setAmount('');
      setDescription('');
      setType('income'); 
      navigate('/'); 
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="flex items-start justify-center h-screen w-full bg-gray-900 pt-16">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Add New Transaction</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Transaction Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="amount" className="block text-sm font-medium text-white mb-1">Amount</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="block text-sm font-medium text-white mb-1">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>

          <div className="form-group">
            <label htmlFor="type" className="block text-sm font-medium text-white mb-1">Transaction Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 rounded-md font-bold hover:bg-blue-700 transition"
          >
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewTransaction;
