// src/pages/SellerDashboard.js

import React, { useState } from 'react';
import './Dashboard.css'; // Import common dashboard CSS

const SellerDashboard = () => {
  const [products, setProducts] = useState([]); // State to hold products
  const [newProduct, setNewProduct] = useState({ name: '', price: '', image: null }); // State for new product
  const [editingProductId, setEditingProductId] = useState(null); // State to track the product being edited

  // Handle product submission
  const handleAddProduct = (e) => {
    e.preventDefault();

    const productWithImage = {
      id: products.length + 1,
      name: newProduct.name,
      price: newProduct.price,
      image: URL.createObjectURL(newProduct.image), // Create a URL for the uploaded image
    };

    // If editing, update the existing product; otherwise, add a new product
    if (editingProductId) {
      setProducts(products.map(product => 
        product.id === editingProductId ? productWithImage : product
      ));
      setEditingProductId(null); // Reset editing state
    } else {
      // Add new product to the list
      setProducts([...products, productWithImage]);
    }

    // Reset form fields
    setNewProduct({ name: '', price: '', image: null });
  };

  // Handle product edit
  const handleEditProduct = (product) => {
    setNewProduct({ name: product.name, price: product.price, image: null });
    setEditingProductId(product.id); // Set the editing product ID
  };

  // Handle product deletion
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="dashboard-container">
      <h1>Seller Dashboard</h1>
      <h2>Manage Products</h2>

      {/* Add/Edit Product Form */}
      <form className="add-product-form" onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.files[0] })}
        />
        <button type="submit">{editingProductId ? 'Update Product' : 'Add Product'}</button>
      </form>

      {/* Display Products */}
      <ul className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
              <button onClick={() => handleEditProduct(product)}>Edit</button>
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
};

export default SellerDashboard;
