import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('password');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleToggle = () => {
    setMode((prev) => (prev === 'password' ? 'pin' : 'password'));
    setError('');
    setPassword('');
    setPin('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || {};
    const user = users[email];
    if (!user) return setError('User not found.');

    if (mode === 'password' && user.password !== password) return setError('Incorrect password.');
    if (mode === 'pin' && user.pin !== pin) return setError('Incorrect PIN.');

    sessionStorage.setItem('user', email);
    sessionStorage.setItem('name', user.name);
    onLogin(email);
    navigate('/');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2 className="login-title">🔐 Login</h2>

        <button type="button" onClick={handleToggle} className="login-toggle">
          Switch to {mode === 'password' ? 'PIN' : 'Password'} Login
        </button>

        {error && <p className="login-error">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          required
        />

        {mode === 'password' ? (
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />
        ) : (
          <input
            type="password"
            placeholder="4-digit PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            maxLength={4}
            className="login-input"
            required
          />
        )}

        <button type="submit" className="login-button">
          ➡️ Login
        </button>

        <p className="login-link">
          Don’t have an account?{' '}
          <button onClick={() => navigate('/register')}>Register</button>
        </p>
      </form>
    </div>
  );
}

export default Login;
