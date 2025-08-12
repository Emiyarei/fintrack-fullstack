import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export function IncomeExpenseBar({labels, incomeData, expenseData}){
  const data = {
    labels,
    datasets: [
      { label: 'Income', data: incomeData, backgroundColor: '#10B981' },
      { label: 'Expenses', data: expenseData, backgroundColor: '#ef4444' }
    ]
  };
  return <Bar data={data} />;
}

export function CategoryPie({labels, values}){
  const data = { labels, datasets: [{ data: values, backgroundColor: ['#10B981', '#F59E0B', '#ef4444', '#60a5fa'] }] };
  return <Pie data={data} />;
}
