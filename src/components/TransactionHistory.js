import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf'; // Importation de jsPDF
import 'jspdf-autotable'; // Importation du plugin autoTable

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(''); // Ajout d'un état pour gérer les erreurs
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/transactions', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.transactions) {
        setTransactions(response.data.transactions);
      } else {
        setTransactions([]); 
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Session expired, please log in again.');
      } else {
        setErrorMessage('Error fetching transactions. Please try again later.');
      }
    }
  };

  // Fonction pour générer le PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Titre
    doc.text('Transactions Report', 14, 10);
    
    // Générer les données pour le tableau
    const tableColumn = ["Name", "Amount", "Type", "Description"];
    const tableRows = [];

    transactions.forEach(transaction => {
      const transactionData = [
        transaction.name,
        transaction.amount,
        transaction.type,
        transaction.description || "No description"
      ];
      tableRows.push(transactionData);
    });

    doc.autoTable(tableColumn, tableRows, { startY: 20 });
    doc.save('transactions_report.pdf');
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-full bg-gray-900 pt-16">
      <div className="bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Transaction History</h2>
        <button
          onClick={generatePDF}
          className="mb-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Download PDF
        </button>

        {errorMessage && (
          <p className="text-red-500 text-center mb-6">{errorMessage}</p>
        )}

        {transactions.length === 0 && !errorMessage ? (
          <p className="text-white text-center">No transactions found</p>
        ) : (
          <ul className="space-y-4">
            {transactions.map((transaction) => (
              <li key={transaction.id} className="bg-gray-700 p-4 rounded-lg shadow">
                <div className="flex justify-between items-center">
                  <div className="space-y-2 text-white">
                    <div className="font-bold">{transaction.name}</div>
                    <div className={`text-lg ${transaction.type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                      {transaction.type === 'expense' ? `- ${transaction.amount} $` : `${transaction.amount} $`}
                    </div>
                    <div className="text-sm">{transaction.description || 'No description provided'}</div>
                    <div className="text-sm capitalize">{transaction.type}</div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Transaction;
