// src/pages/Transactions.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/transactions.css'; 

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null); 
  const [formValues, setFormValues] = useState({ name: '', amount: '', description: '', type: '' });

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEditClick = (transaction) => {
    setEditTransaction(transaction.id);
    setFormValues({
      name: transaction.name,
      amount: transaction.amount,
      description: transaction.description,
      type: transaction.type,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/transactions/${editTransaction}`, formValues, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditTransaction(null);
      fetchTransactions(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating transaction:', error);
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <div className="transactions-container">
      <h2>Transaction History</h2>
      {transactions.length === 0 ? (
        <p>No transactions found</p>
      ) : (
        <ul className="transactions-list">
          {transactions.map((transaction) => (
            <li key={transaction.id} className="transaction-item">
              {editTransaction === transaction.id ? (
                <form onSubmit={handleUpdate} className="edit-form">
                  <input
                    type="text"
                    name="name"
                    value={formValues.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="number"
                    name="amount"
                    value={formValues.amount}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                  />
                  <select
                    name="type"
                    value={formValues.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                  <button type="submit" className="save-btn">Save</button>
                </form>
              ) : (
                <>
                  <div className="transaction-details">
                    <div className="transaction-title">{transaction.name}</div>
                    <div className={`transaction-amount ${transaction.type}`}>
                      {transaction.type === 'expense' ? `- ${transaction.amount} $` : `${transaction.amount} $`}
                    </div>
                    <div className="transaction-description">{transaction.description || 'No description provided'}</div>
                    <div className="transaction-type">
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </div>
                  </div>
                  <div className="transaction-actions">
                    <button onClick={() => handleEditClick(transaction)} className="edit-btn">Edit</button>
                    <button onClick={() => handleDelete(transaction.id)} className="delete-btn">Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Transaction;

