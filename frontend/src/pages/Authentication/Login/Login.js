import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'global-explorer-country-app.vercel.app';
      const response = await axios.post(`${apiUrl}/users/login`, formData);
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000); // Redirect to home after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="login-form-box"
        >
          <div className="login-icon-container">
            <FaUserCircle size={80} className="login-icon" />
          </div>
          <h2 className="login-title">Welcome Back</h2>
          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input-group">
              <label htmlFor="email" className="login-label">Email</label>
              <input
                type="email"
                className="login-input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="login-input-group">
              <label htmlFor="password" className="login-label">Password</label>
              <input
                type="password"
                className="login-input"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-button">Sign In</button>
          </form>
          <p className="login-register-text">
            New here? <Link to="/register" className="login-register-link">Create an Account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;