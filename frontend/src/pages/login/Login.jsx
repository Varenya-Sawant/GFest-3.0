import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (isValid) {
      try {
        const response = await axios.post('http://192.168.152.58:3000/api/login', formData);
        const data = await response.data;

        if (response.status === 200) {
          localStorage.setItem('user_email', data.user.email);
          localStorage.setItem('user_type', data.user.userTypes);

          navigate('/');
          window.location.reload();
        } else {
          setErrors({ server: data.message || 'Login failed' });
        }
      } catch (error) {
        console.error({ error });
        setErrors({ server: error.response?.data?.message || 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>

        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
          />
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        {errors.server && <span className="form-error server-error">{errors.server}</span>}
        <button type="submit" className="submit-button">Login</button>
      </form>
    </div>
  );
};

export default Login;