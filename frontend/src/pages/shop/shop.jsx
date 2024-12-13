import React from "react";
import { PRODUCTS } from "../../products";
import { Product } from "./product";
import ShopNavbar from "../../components/ShopNavbar"; // Import the new ShopNavbar
import "./shop.css";

export const Shop = () => {
  return (
    <div className="shop">
      <ShopNavbar /> {/* Add the secondary navbar here */}

      <div className="shopTitle">
        <h1>PedroTech Shop</h1>
      </div>

      <div className="products">
        {PRODUCTS.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
