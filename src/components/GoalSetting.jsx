import React, { useEffect, useState } from 'react';
import './GoalSetting.css';

function GoalSetting({ income, transactions, user }) {
  const [goal, setGoal] = useState(0);
  const [input, setInput] = useState('');
  const [totalSaved, setTotalSaved] = useState(0);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const currentMonth = new Date().getMonth();
    const userData = users[user] || {};

    if (userData.goal) setGoal(userData.goal);
    if (userData.totalSaved) setTotalSaved(userData.totalSaved);

    if (userData.lastGoalMonth !== currentMonth) {
      const leftover = income - transactions.reduce((sum, txn) => sum + txn.amount, 0);
      const updatedSaved = (userData.totalSaved || 0) + (leftover > 0 ? leftover : 0);

      users[user] = {
        ...userData,
        totalSaved: updatedSaved,
        lastGoalMonth: currentMonth,
      };

      localStorage.setItem('users', JSON.stringify(users));
      setTotalSaved(updatedSaved);
    }
  }, [user, income, transactions]);

  const handleSave = () => {
    const value = Number(input);
    if (value > 0) {
      setGoal(value);
      const users = JSON.parse(localStorage.getItem('users')) || {};
      if (users[user]) {
        users[user].goal = value;
        localStorage.setItem('users', JSON.stringify(users));
      }
      setInput('');
    }
  };

  const handleReset = () => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[user]) {
      users[user].goal = 0;
      localStorage.setItem('users', JSON.stringify(users));
    }
    setGoal(0);
  };

  const totalExpense = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  const saving = income - totalExpense;
  const progress = goal > 0 ? Math.min((saving / goal) * 100, 100) : 0;

  return (
    <div className="goal-container">
      <h3>🎯 Monthly Saving Goal</h3>

      <div className="goal-bar-wrapper">
        <div className="goal-bar">
          <div className="goal-bar-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="goal-progress">
          {goal
            ? `Saving: ₹${saving} / ₹${goal} (${Math.floor(progress)}%)`
            : 'No goal set.'}
        </p>
        <p className="goal-total">💹 Total Saved: ₹{totalSaved}</p>
      </div>

      <div className="goal-input-wrapper">
        <input
          type="number"
          placeholder="Enter monthly saving goal"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSave}>Save Goal</button>
        <button onClick={handleReset} className="reset-btn">Reset Goal</button>
      </div>
    </div>
  );
}

export default GoalSetting;
