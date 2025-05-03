import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUserPlus } from 'react-icons/fi';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'user' });
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
    if (!formData.name || !formData.email || !formData.password) {
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
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/'), 2000); // Redirect to home after 2 seconds
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="register-form-box"
        >
          <div className="register-icon-container">
            <FiUserPlus size={60} className="register-icon" />
          </div>
          <h2 className="register-title">Join Us</h2>
          {error && <div className="register-error">{error}</div>}
          {success && <div className="register-success">{success}</div>}
          <form onSubmit={handleSubmit} className="register-form">
            <div className="register-input-group">
              <label htmlFor="name" className="register-label">Name</label>
              <input
                type="text"
                className="register-input"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-input-group">
              <label htmlFor="email" className="register-label">Email</label>
              <input
                type="email"
                className="register-input"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="register-input-group">
              <label htmlFor="password" className="register-label">Password</label>
              <input
                type="password"
                className="register-input"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="register-button">Sign Up</button>
          </form>
          <p className="register-login-text">
            Already a member? <Link to="/login" className="register-login-link">Sign In</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;