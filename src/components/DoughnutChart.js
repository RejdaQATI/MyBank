import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const DoughnutChart = ({ income, expenses }) => {
  const total = income + expenses;

  const data = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        label: 'Amount in $',
        data: [income, expenses],
        backgroundColor: ['#4caf50', '#f44336'], // Vert pour les revenus, rouge pour les dépenses
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const value = tooltipItem.raw;
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${value}$ (${percentage}%)`;
          },
        },
      },
      datalabels: {
        color: 'white',
        formatter: (value, context) => {
          const percentage = ((value / total) * 100).toFixed(2);
          return `${percentage}%`; // Afficher uniquement le pourcentage
        },
        font: {
          size: 16,
          weight: 'bold',
        },
        anchor: 'center',
        align: 'center',
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
