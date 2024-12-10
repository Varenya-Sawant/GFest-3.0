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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    setSelectedProduct(null); // Close the modal
    setQuantity(1); // Reset the quantity
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
        {showCart && (
          <div className="cart-dropdown">
            <h3>Your Cart</h3>
            {cart.length > 0 ? (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <h4>{item.name}</h4>
                    <p>Price: ${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button
                      className="remove-from-cart-button"
                      onClick={() => setCart(cart.filter((c) => c.id !== item.id))}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <h4>Total: ${calculateTotalPrice()}</h4>
              </>
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        )}
      </div>

      {/* Event-Related Products Section */}
      <h2>Event-Related Products</h2>
      <div className="product-list">
        {products.filter((product) => product.category === 'event').map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">${product.price}</p>
            <button
              className="add-to-cart-button"
              onClick={() => setSelectedProduct(product)}
            >
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
            <button
              className="add-to-cart-button"
              onClick={() => setSelectedProduct(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Quantity Selector Modal */}
      {selectedProduct && (
        <div className="quantity-modal">
          <div className="modal-content">
            <h3>{`Add "${selectedProduct.name}" to Cart`}</h3>
            <label>
              Quantity:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </label>
            <div className="modal-buttons">
              <button
                onClick={() => handleAddToCart(selectedProduct, quantity)}
                className="confirm-button"
              >
                Add
              </button>
              <button
                onClick={() => setSelectedProduct(null)}
                className="cancel-button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
