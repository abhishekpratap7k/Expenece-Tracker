import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddIncome from './components/AddIncome';
import AddExpense from './components/AddExpense';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import FilterBar from './components/FilterBar';
import SortBar from './components/SortBar';
import SpendingChart from './components/SpendingChart';
import ExportCSV from './components/ExportCSV';
import GoalSetting from './components/GoalSetting';
import GoalChart from './components/GoalChart';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import './App.css';

function Dashboard({ user, onLogout }) {
  const [income, setIncome] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const userName = sessionStorage.getItem('name') || user;
  const currentMonth = new Date().getMonth();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const userData = users[user] || { income: 0, transactions: [], savings: {}, lastMonth: currentMonth };

    if (userData.lastMonth !== currentMonth) {
      const totalExpenses = userData.transactions.reduce((sum, txn) => sum + txn.amount, 0);
      const leftover = userData.income - totalExpenses;
      const updatedSavings = { ...userData.savings };
      updatedSavings[currentMonth - 1] = leftover > 0 ? leftover : 0;

      users[user] = {
        ...userData,
        transactions: [],
        savings: updatedSavings,
        lastMonth: currentMonth,
      };

      localStorage.setItem('users', JSON.stringify(users));
      setTransactions([]);
      setIncome(userData.income);
    } else {
      setIncome(userData.income);
      setTransactions(userData.transactions);
    }
  }, [user]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[user] = { ...users[user], income, transactions };
    localStorage.setItem('users', JSON.stringify(users));
    setFiltered(transactions);
  }, [income, transactions, user]);

  const addTransaction = (txn) => {
    setTransactions([txn, ...transactions]);
  };

  const handleEdit = (index, updatedTxn) => {
    const updatedList = [...transactions];
    updatedList[index] = updatedTxn;
    setTransactions(updatedList);
  };

  const handleDelete = (index) => {
    const updatedList = [...transactions];
    updatedList.splice(index, 1);
    setTransactions(updatedList);
  };

  const handleFilter = ({ category, date }) => {
    const result = transactions.filter((txn) => {
      const matchCategory = category ? txn.category.toLowerCase().includes(category.toLowerCase()) : true;
      const matchDate = date ? txn.date === date : true;
      return matchCategory && matchDate;
    });
    setFiltered(result);
  };

  const handleSort = (type) => {
    const sorted = [...filtered];
    if (type === 'date-desc') sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (type === 'date-asc') sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (type === 'amount-desc') sorted.sort((a, b) => b.amount - a.amount);
    else if (type === 'amount-asc') sorted.sort((a, b) => a.amount - b.amount);
    setFiltered(sorted);
  };

  const handleResetTransactions = () => {
    setTransactions([]);
  };

  const handleResetIncome = () => {
    setIncome(0);
  };

  return (
    <div className="dashboard-container">
      <Logout onLogout={onLogout} />
      <h1 className="text-2xl font-bold text-center mb-4">Welcome, {userName} 👋</h1>

      <div className="metrics-panel">
        <div className="metric-card total">💰 ₹{income}<span>Total Income</span></div>
      </div>

      <AddIncome setIncome={setIncome} income={income} />
      <button
        onClick={handleResetIncome}
        className="w-full bg-yellow-600 text-white py-2 rounded mb-4 hover:opacity-90"
      >
        ♻️ Reset Monthly Income
      </button>

      <AddExpense addTransaction={addTransaction} />
      <FilterBar onFilter={handleFilter} />
      <SortBar onSort={handleSort} />
      <Summary income={income} transactions={filtered} />
      <GoalSetting income={income} transactions={filtered} user={user} />
      <GoalChart user={user} />
      <ExportCSV transactions={filtered} />

      <button
        onClick={handleResetTransactions}
        className="w-full bg-red-700 text-white py-2 rounded mb-4 hover:opacity-90"
      >
        🧹 Reset All Transactions
      </button>

      <TransactionList transactions={filtered} onEdit={handleEdit} onDelete={handleDelete} />
      <SpendingChart transactions={filtered} />
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => sessionStorage.getItem('user') || '');

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('name');
    setUser('');
  };

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Dashboard user={user} onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}

export default App;
