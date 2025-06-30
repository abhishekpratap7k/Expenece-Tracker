import React from 'react';
import './export.css';

function ExportCSV({ transactions }) {
  const downloadCSV = () => {
    const headers = ['Category,Amount,Date'];
    const rows = transactions.map(txn =>
      `${txn.category},${txn.amount},${txn.date}`
    );
    const csvContent = [headers, ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-container">
      <button onClick={downloadCSV} className="export-btn">
        📤 Export as CSV
      </button>
    </div>
  );
}

export default ExportCSV;
