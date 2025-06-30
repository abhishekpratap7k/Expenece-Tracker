import React, { useState } from 'react';
import './AddIncome.css';

function AddIncome({ setIncome, income }) {
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = Number(amount);
    if (value > 0) {
      setIncome(value);
      setAmount('');
    }
  };

  const handleReset = () => {
    setIncome(0);
  };

  return (
    <div className="income-card">
      {income > 0 ? (
        <div className="income-display">
          <p className="income-value">
            💰 Monthly Income: ₹{income}
          </p>
          <button onClick={handleReset} className="income-reset-btn">
            🔄 Reset Monthly Income
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3 className="income-title">Set Monthly Income</h3>
          <input
            type="number"
            placeholder="Enter monthly income"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="income-input"
          />
          <button type="submit" className="income-submit-btn">
            💾 Save Income
          </button>
        </form>
      )}
    </div>
  );
}

export default AddIncome;
