// src/pages/LoginSignUp.jsx
import React, { useState } from 'react';
import './LoginSignUp.css'; // Assuming you have a separate CSS for login/signup

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

      <form className="auth-form">
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />

        {!isLogin && (
          <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              required
            />
          </div>
        )}

        <button type="submit" className="auth-button">
          {isLogin ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <div className="toggle-link">
        <span>
          {isLogin
            ? 'New user?'
            : 'Already have an account?'}{' '}
          <button onClick={toggleForm} className="toggle-button">
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </span>
      </div>
    </div>
  );
};

export default LoginSignUp;
