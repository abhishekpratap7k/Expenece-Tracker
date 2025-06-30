import React from 'react';
import './SortBar.css';

function SortBar({ onSort }) {
  return (
    <div className="sortbar-container">
      <button onClick={() => onSort('date-desc')} className="sort-btn blue">
        📅 Date (Newest First)
      </button>
      <button onClick={() => onSort('date-asc')} className="sort-btn blue">
        📅 Date (Oldest First)
      </button>
      <button onClick={() => onSort('amount-desc')} className="sort-btn green">
        💸 Amount (High to Low)
      </button>
      <button onClick={() => onSort('amount-asc')} className="sort-btn green">
        💸 Amount (Low to High)
      </button>
    </div>
  );
}

export default SortBar;
