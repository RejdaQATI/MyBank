import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentTransactions = () => {
  const [recentTransactions, setRecentTransactions] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRecentTransactions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transactions = response.data.transactions;
        const lastFiveTransactions = transactions.slice(-5).reverse(); // Prendre les 5 dernières transactions et les inverser
        setRecentTransactions(lastFiveTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchRecentTransactions();
  }, [token]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
      {recentTransactions.length === 0 ? (
        <p className="text-white">No recent transactions found</p>
      ) : (
        <ul className="space-y-2">
          {recentTransactions.map((transaction) => (
            <li key={transaction.id} className="bg-gray-700 p-2 rounded-md shadow-md">
              <div className="flex justify-between text-white">
                <span>{transaction.name}</span>
                <span className={transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}>
                  {transaction.type === 'expense' ? `- ${transaction.amount} $` : `${transaction.amount} $`}
                </span>
              </div>
              <p className="text-sm text-gray-400">{transaction.description || 'No description provided'}</p>
              <p className="text-sm capitalize text-gray-400">{transaction.type}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentTransactions;
