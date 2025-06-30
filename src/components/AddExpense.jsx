import React, { useState } from 'react';
import "./AddExpense.css";

function AddExpense({ addTransaction }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const date = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

    const time = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    const txn = {
      category,
      amount: Number(amount),
      date,
      time,
      type: 'expense',
    };

    addTransaction(txn);
    setCategory('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-expense-form">
      <h3 className="form-title">💸 Add Expense</h3>
      <input
        type="text"
        placeholder="Expense Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
        className="form-input"
      />
      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        className="form-input"
      />
      <button
        type="submit"
        className="form-button"
      >
        ➕ Add Expense
      </button>
    </form>
  );
}

export default AddExpense;
