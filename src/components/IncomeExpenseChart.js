import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const IncomeExpenseChart = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

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

        console.log(response.data);
  
        const transactions = response.data.transactions;  
        if (Array.isArray(transactions)) {
          const incomeData = transactions.filter(transaction => transaction.type === 'income').map(transaction => transaction.amount);
          const expensesData = transactions.filter(transaction => transaction.type === 'expense').map(transaction => transaction.amount);
  
          setIncome(incomeData);
          setExpenses(expensesData);
        } else {
          console.error("Les données reçues ne contiennent pas le tableau des transactions.");
        }
  
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error.response ? error.response.data : error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const data = {
    labels: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5', 'Point 6', 'Point 7'], 
    datasets: [
      {
        label: 'Income',
        data: income,  
        fill: false,
        borderColor: 'rgb(0, 255, 0)',
        tension: 0.1
      },
      {
        label: 'Expenses',
        data: expenses, 
        fill: false,
        borderColor: 'rgb(255, 0, 0)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true
      },
      y: {
        beginAtZero: true
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Income and Expenses Chart</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default IncomeExpenseChart;
