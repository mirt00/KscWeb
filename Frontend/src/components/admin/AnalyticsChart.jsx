// src/components/admin/AnalyticsChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const AnalyticsChart = ({ title, data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: title,
        data: data.values,
        borderColor: '#3B82F6', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { size: 14 }, color: '#374151' }, // Tailwind gray-700
      },
      title: {
        display: true,
        text: title,
        font: { size: 18, weight: 'bold' },
        color: '#111827', // Tailwind gray-900
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        ticks: { color: '#6B7280', font: { size: 12 } }, // Tailwind gray-500
        grid: { color: 'rgba(203,213,225,0.3)' }, // Tailwind gray-300
      },
      y: {
        ticks: { color: '#6B7280', font: { size: 12 } },
        grid: { color: 'rgba(203,213,225,0.3)' },
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default AnalyticsChart;
