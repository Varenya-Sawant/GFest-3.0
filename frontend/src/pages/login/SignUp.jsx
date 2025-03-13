import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './SignUp.css'

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    userTypes: {
      HOST: false,
      ARTISIAN: false,
      SELLER: false
    }
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        userTypes: {
          ...prev.userTypes,
          [name]: checked
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = async () => {
    let newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character';
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ formData });

    const isValid = await validateForm();

    if (isValid) {
      try {
        const response = await axios.post('http://localhost:3000/api/register', formData);
        const data = await response.data;
        // console.log({ data });

        if (response.status == 201) {
          alert('Registration successful! Redirecting to login page.');

          navigate('/login');
          // redirect
        } else if (response.status == 200) {
          alert("Email already registered")
        } else {
          setErrors({ server: data.c });
        }
      } catch (error) {
       // console.error({ error });

        setErrors({ server: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="registration-form">
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
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Password:</label>
        {/* <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
       */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          spellCheck="false"
        />


        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
      </div>

      <div>
        <label>User Types:</label>
        <div className="checkbox-group">
          {Object.keys(formData.userTypes).map(type => (
            <label key={type}>
              <input
                type="checkbox"
                name={type}
                checked={formData.userTypes[type]}
                onChange={handleChange}
              />
              {type.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ))}
        </div>
        {errors.userTypes && <span className="error">{errors.userTypes}</span>}
      </div>

      {errors.server && <span className="error">{errors.server}</span>}
      <button type="submit">Register</button>
    </form>
  );
};

export default SignUp;