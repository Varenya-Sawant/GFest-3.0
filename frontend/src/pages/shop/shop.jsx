import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./Product";
import ShopNavbar from "../../components/ShopNavbar"; // Import the new ShopNavbar
import "./shop.css";

export const Shop = () => {
  // Create two categories: Event Related and General Products
  const eventRelatedProducts = PRODUCTS.filter(product =>
    product.id === 1 || product.id === 2 || product.id === 3
  );

  const generalProducts = PRODUCTS.filter(product =>
    product.id !== 4 && product.id !== 5 && product.name !== 6
    
  );

  return (
    <div className="shop">
      <ShopNavbar /> {/* Add the secondary navbar here */}

      <div className="shopTitle">
        <h1>Shop</h1>
      </div>

      {/* Event Related Products Section */}
      <div className="categoryTitle">
        <h2>Event Related Products</h2>
      </div>
      <div className="products">
        {eventRelatedProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>

      {/* General Products Section */}
      <div className="categoryTitle">
        <h2>General Products</h2>
      </div>
      <div className="products">
        {generalProducts.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
