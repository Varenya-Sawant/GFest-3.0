import React from 'react';
import { Link } from 'react-router'; // Corrected to 'react-router-dom'
import './Navbar.css';
import logoImage from '../images/logo.png';

const isUserLoggedIn = () => Boolean(localStorage.getItem('user_email'));
const getUserTypes = () => localStorage.getItem('user_type')?.split(',') || [];
const isHost = () => getUserTypes().includes('HOST');
const isSeller = () => getUserTypes().includes('SELLER');
const isAdmin = () => getUserTypes().includes('ADMIN'); // Added admin check
const isHostAndSeller = () => isHost() && isSeller();

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/" className="logo">
        <img src={logoImage} alt="Events" />
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/events">EVENTS</Link>
        <Link to="/services">SERVICES</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/forum">FORUM</Link>
        <Link to="/contact">CONTACT</Link>
      </div>

      <div className="login-button">
        {isUserLoggedIn() ? (
          <>
            {isAdmin() && (
              <Link to="/admin">
                <button className="navbar-button">Admin Dashboard</button>
              </Link>
            )}
            {isHostAndSeller() && (
              <>
                <Link to="/events/create">
                  <button className="navbar-button">Create Event</button>
                </Link>
                <Link to="/seller/products">
                  <button className="navbar-button">Add Products</button>
                </Link>
              </>
            )}
            {isHost() && !isSeller() && !isAdmin() && (
              <Link to="/events/create">
                <button className="navbar-button">Create Event</button>
              </Link>
            )}
            {isSeller() && !isHost() && !isAdmin() && (
              <Link to="/seller/products">
                <button className="navbar-button">Add Products</button>
              </Link>
            )}
            <Link to="/profile">
              <button className="navbar-button">Your Profile</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="navbar-button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="navbar-button">Sign Up</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;