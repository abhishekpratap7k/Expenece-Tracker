import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './GoalChart.css';

function GoalChart({ user }) {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    const savingsHistory = JSON.parse(localStorage.getItem(`savingsHistory-${user}`)) || {};
    const data = Object.entries(savingsHistory).map(([month, amount]) => ({
      month,
      savings: amount,
    }));
    setMonthlyData(data);
  }, [user]);

  return (
    <div className="goal-chart-container">
      <h3 className="goal-chart-title">📈 Monthly Savings Progress</h3>
      {monthlyData.length === 0 ? (
        <p className="goal-chart-empty">No savings data available.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="savings" fill="#38bdf8" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default GoalChart;
