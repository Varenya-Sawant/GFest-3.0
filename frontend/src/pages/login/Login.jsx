import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        const response = await axios.post('http://localhost:3000/api/login', formData);
        const data = await response.data;
        console.log({ data });

        if (response.status === 200) {
          localStorage.setItem('user_email', data.user.email);
          localStorage.setItem('user_type', data.user.userTypes);

          navigate('/');
          window.location.reload();
        } else {
          setErrors({ server: data.message || 'Login failed' });
        }
      } catch (error) {
        console.log({ error });
        setErrors({ server: error.response?.data?.message || 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      {errors.server && <span className="error">{errors.server}</span>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;