import React from "react";
import "./Summary.css";

function Summary({ income, transactions }) {
  const totalExpenses = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const balance = income - totalExpenses;
  const isNegative = balance < 0;

  return (
    <div className="summary-panel">
      <div className="summary-card green">
        <h3>💰 Income</h3>
        <p>₹{income}</p>
      </div>
      <div className="summary-card red">
        <h3>💸 Expenses</h3>
        <p>₹{totalExpenses}</p>
      </div>
      <div className={`summary-card ${isNegative ? "negative" : "positive"}`}>
        <h3>⚖️ Balance</h3>
        <p>₹{balance}</p>
      </div>
         {isNegative && (
        <p className="summary-warning">
          ⚠️ You are overspending! Your balance is negative.
        </p>
      )}
    </div>
  );
}

export default Summary;
