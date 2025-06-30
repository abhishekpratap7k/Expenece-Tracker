import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Custom CSS file

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', pin: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, password, pin } = form;
    if (!name || !email || !password || !pin) return 'All fields are required.';
    if (!email.includes('@') || !email.includes('.')) return 'Invalid email format.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (!/^[0-9]{4}$/.test(pin)) return 'PIN must be a 4-digit number.';
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validate();
    if (errorMsg) return setError(errorMsg);

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[form.email]) return setError('User already exists with this email.');

    users[form.email] = {
      name: form.name,
      password: form.password,
      pin: form.pin,
      income: 0,
      transactions: [],
    };

    localStorage.setItem('users', JSON.stringify(users));
    alert('✅ Registration successful! Please log in.');
    navigate('/login');
  };

  return (
    <div className="register-wrapper">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-heading">📝 Register</h2>
        {error && <p className="register-error">{error}</p>}

        <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} className="register-input" required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="register-input" required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="register-input" required />
        <input type="password" name="pin" placeholder="4-digit PIN" value={form.pin} onChange={handleChange} maxLength={4} className="register-input" required />

        <button type="submit" className="register-button">➕ Register</button>
      </form>
    </div>
  );
}

export default Register;
