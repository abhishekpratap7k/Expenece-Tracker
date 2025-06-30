import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import './Spending.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c'];

function SpendingChart({ transactions }) {
  const expenses = transactions.filter((txn) => txn.type === 'expense');

  const categoryData = expenses.reduce((acc, txn) => {
    const found = acc.find((item) => item.name === txn.category);
    if (found) {
      found.value += txn.amount;
    } else {
      acc.push({ name: txn.category, value: txn.amount });
    }
    return acc;
  }, []);

  return (
    <div className="spending-chart-container">
      <h2 className="spending-chart-title">📊 Spending by Category</h2>
      {categoryData.length === 0 ? (
        <p className="spending-chart-empty">No expenses to display.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart;
