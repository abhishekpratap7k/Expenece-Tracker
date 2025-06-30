import React from 'react';
import './logout.css';

function Logout({ onLogout }) {
  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('name');
    onLogout();
  };

  return (
    <div className="logout-wrapper">
      <button onClick={handleLogout} className="logout-btn">
        🔓 Logout
      </button>
    </div>
  );
}

export default Logout;
