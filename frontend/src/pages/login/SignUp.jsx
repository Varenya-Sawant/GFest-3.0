import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './SignUp.css';

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
      SELLER: false,
    },
    companyName: '',
    companyAddress: '',
    artisanServiceDescription: '',
    artisanProfession: '',
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
      setFormData((prev) => ({
        ...prev,
        userTypes: {
          ...prev.userTypes,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = async () => {
    let newErrors = {};

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!validatePassword(formData.password)) {
      newErrors.password =
        'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character';
    }

    if (!validatePhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();

    if (isValid) {
      try {
        const response = await axios.post('http://192.168.152.58:3000/api/register', formData);
        const data = await response.data;

        if (response.status === 201) {
          alert('Registration successful! Redirecting to login page.');
          navigate('/login');
        } else if (response.status === 200) {
          alert('Email already registered');
        } else {
          setErrors({ server: data.message });
        }
      } catch (error) {
        setErrors({ server: 'Registration failed. Please try again.' });
      }
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2 className="signup-title">Sign Up</h2>

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
          <label className="form-label">Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            spellCheck="false"
            className="form-input"
          />
          {errors.password && <span className="form-error">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="form-input"
          />
          {errors.phoneNumber && <span className="form-error">{errors.phoneNumber}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">User Types:</label>
          <div className="checkbox-group">
            {Object.keys(formData.userTypes).map((type) => (
              <label key={type} className="checkbox-label">
                <input
                  type="checkbox"
                  name={type}
                  checked={formData.userTypes[type]}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                {type.replace(/([A-Z])/g, '$1').trim()}
              </label>
            ))}
          </div>
        </div>

        {formData.userTypes.ARTISIAN && (
          <>
            <div className="form-group">
              <label className="form-label">Artisan Service Description:</label>
              <textarea
                name="artisanServiceDescription"
                value={formData.artisanServiceDescription}
                onChange={handleChange}
                className="form-textarea"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Artisan Profession:</label>
              <input
                type="text"
                name="artisanProfession"
                value={formData.artisanProfession}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </>
        )}

        {formData.userTypes.HOST && formData.userTypes.SELLER ? (
          <>
            <div className="form-group">
              <label className="form-label">Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Seller Company Address:</label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </>
        ) : formData.userTypes.HOST ? (
          <div className="form-group">
            <label className="form-label">Host Company Name:</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        ) : (
          formData.userTypes.SELLER && (
            <>
              <div className="form-group">
                <label className="form-label">Seller Company Name:</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Company Address:</label>
                <input
                  type="text"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </>
          )
        )}

        {errors.server && <span className="form-error server-error">{errors.server}</span>}
        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default SignUp;