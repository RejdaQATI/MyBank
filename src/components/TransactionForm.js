// src/pages/AddTransaction.js
import React, { useState } from 'react';
import axios from 'axios';
import '../style/addTransaction.css'; 

const AddNewTransaction = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('income'); 

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
      // Reset form
      setName('');
      setAmount('');
      setDescription('');
      setType('income'); 
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="add-transaction-container">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit} className="add-transaction-form">
        <div className="form-group">
          <label htmlFor="name">Transaction Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description (optional)</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="type">Transaction Type</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Add Transaction</button>
      </form>
    </div>
  );
};

export default AddNewTransaction;
