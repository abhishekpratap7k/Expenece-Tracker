import React, { useState } from 'react';
import './Transaction.css';

function TransactionList({ transactions, onEdit, onDelete }) {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ category: '', amount: '' });

  const startEdit = (index) => {
    const txn = transactions[index];
    setEditData({ category: txn.category, amount: txn.amount });
    setEditingIndex(index);
  };

  const handleSave = () => {
    if (editData.category && editData.amount) {
      const updatedTxn = {
        ...transactions[editingIndex],
        category: editData.category,
        amount: Number(editData.amount),
      };
      onEdit(editingIndex, updatedTxn);
      setEditingIndex(null);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };

  const handleDeleteClick = (index) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDelete(index);
    }
  };

  return (
    <div className="txn-container">
      <h3 className="txn-title">🧾 Transactions</h3>
      <ul className="txn-list">
        {transactions.map((txn, index) => (
          <li key={index} className="txn-item">
            <div className="txn-details">
              <p className="txn-category">{txn.category}</p>
              <p className="txn-datetime">
                🕒 {txn.date} at {txn.time || 'N/A'}
              </p>
            </div>
            <div className="txn-amount-actions">
              <span className={`txn-amount ${txn.type === 'income' ? 'income' : 'expense'}`}>
                ₹{txn.amount}
              </span>
              <div className="txn-buttons">
                <button onClick={() => startEdit(index)} className="txn-edit">✏️</button>
                <button onClick={() => handleDeleteClick(index)} className="txn-delete">🗑️</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editingIndex !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Transaction</h3>
            <input
              type="text"
              placeholder="Category"
              value={editData.category}
              onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            />
            <input
              type="number"
              placeholder="Amount"
              value={editData.amount}
              onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
            />
            <div className="modal-buttons">
              <button onClick={handleSave} className="save-btn">✅ Save</button>
              <button onClick={handleCancel} className="cancel-btn">❌ Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionList;
