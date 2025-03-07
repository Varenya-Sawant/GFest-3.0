import React from 'react';
import { Link } from 'react-router'; // Use Link for internal navigation
import './Navbar.css';
import { ShoppingCart } from "phosphor-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">Gfest</div>

      <div className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/events">EVENTS</Link>
        <Link to="/services">SERVICES</Link>
        <Link to="/shop">SHOP</Link>
        <Link to="/forum">FORUM</Link>
        <Link to="/contact">CONTACT</Link>
        
      </div>

      <div className="login-button">
        <Link to="/login">
          <button className="navbar-button">Login</button>
        </Link>
        <Link to="/signup">
          <button className="navbar-button">Sign Up</button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
