import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import DoughnutChart from '../components/DoughnutChart'; 
import RecentTransactions from '../components/RecentTransactions'; 
import axios from 'axios';

const Homepage = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get('http://localhost:8000/api/transactions', config);
        const transactionsData = response.data.transactions;

        const incomeData = transactionsData
          .filter(transaction => transaction.type === 'income')
          .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);
        const expensesData = transactionsData
          .filter(transaction => transaction.type === 'expense')
          .reduce((sum, transaction) => sum + parseFloat(transaction.amount), 0);

        setIncome(incomeData);
        setExpenses(expensesData);
        setTransactions(transactionsData);  
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error.response ? error.response.data : error.message);
      }
    };

    fetchData();
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('All Transaction History', 14, 10);
    
    const tableColumn = ['Name', 'Amount', 'Type', 'Description'];
    const tableRows = [];

    transactions.forEach(transaction => {
      const transactionData = [
        transaction.name,
        transaction.amount,
        transaction.type,
        transaction.description || 'No description'
      ];
      tableRows.push(transactionData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save('transaction_history.pdf');
  };

  return (
    <div className="flex flex-wrap justify-around items-start h-screen w-full bg-gray-900 pt-16">
      {/* Conteneur du IncomeExpenseChart avec une largeur plus grande */}
      <div className="w-full md:w-2/3 p-4">  
        <IncomeExpenseChart />
      </div>

      <div className="w-full md:w-1/3 p-4">  
        <DoughnutChart income={income} expenses={expenses} />
      </div>

      <div className="w-full p-4 text-right">
        <button
          onClick={generatePDF}
          className="bg-blue-800 hover:bg-blue-800 text-white py-4 mt-6 px-6 rounded-md font-bold"
        >
          Download All Transaction History
        </button>
      </div>

      <div className="w-full ">  
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Homepage;
