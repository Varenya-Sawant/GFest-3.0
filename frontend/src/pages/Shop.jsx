import React, { useState } from 'react';
import './Shop.css';

const Shop = () => {
  const [products] = useState([
    { id: 1, name: 'Event Product 1', price: 20, image: 'path/to/image1.jpg', category: 'event' },
    { id: 2, name: 'Event Product 2', price: 30, image: 'path/to/image2.jpg', category: 'event' },
    { id: 3, name: 'Product 3', price: 25, image: 'path/to/image3.jpg', category: 'general' },
    { id: 4, name: 'Product 4', price: 35, image: 'path/to/image4.jpg', category: 'general' },
    { id: 5, name: 'Product 5', price: 15, image: 'path/to/image5.jpg', category: 'general' },
    { id: 6, name: 'Product 6', price: 40, image: 'path/to/image6.jpg', category: 'general' },
  ]);

  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const handleAddToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    // Show alert on product addition
    alert(`"${product.name}" has been successfully added to your cart.`);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="shop-container">
      <h1>Shop</h1>

      {/* Cart Icon */}
      <div className="cart-icon" onClick={() => setShowCart(!showCart)}>
        🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div>

      {/* Event-Related Products Section */}
      <h2>Event-Related Products</h2>
      <div className="product-list">
        {products.filter(product => product.category === 'event').map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* General Products Section */}
      <h2>All Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Cart Section */}
      {showCart && (
        <div className="cart-container">
          <h2>Your Cart</h2>
          {cart.length > 0 ? (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <button className="remove-from-cart-button" onClick={() => handleRemoveFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              ))}
              <h3>Total: ${calculateTotalPrice()}</h3>
              <button className="checkout-button">Checkout</button>
            </>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Shop;
