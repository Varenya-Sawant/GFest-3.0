// src/components/ShopNavbar.jsx
import React from "react";
import { Link } from "react-router";
import "./ShopNavbar.css"; // Optional: Use separate styling for the Shop Navbar
import { ShoppingCart } from "phosphor-react";

const ShopNavbar = () => {
  return (
    <nav className="shop-navbar">
     
      <div className="shop-nav-links">
        
        <Link to="/cart">
          <ShoppingCart size={24} /> {/* Cart Icon */}
        </Link>
      </div>
    </nav>
  );
};

export default ShopNavbar;
