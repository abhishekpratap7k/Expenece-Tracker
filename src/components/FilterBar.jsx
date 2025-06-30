import React, { useState } from 'react';
import './Filter.css';

function FilterBar({ onFilter }) {
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ category, date });
  };

  return (
    <form onSubmit={handleSubmit} className="filterbar-form">
      <input
        type="text"
        placeholder="🔍 Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="filterbar-input"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="filterbar-input"
      />
      <button type="submit" className="filterbar-button">Apply Filter</button>
    </form>
  );
}

export default FilterBar;
