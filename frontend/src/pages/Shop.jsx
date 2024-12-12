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
  const [activeInlay, setActiveInlay] = useState(null);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(1, item.quantity + quantity) }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId, quantityChange) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(1, item.quantity + quantityChange) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const openInlay = (type, product = null) => {
    if (type === 'add' && product) {
      setActiveInlay({ type, product: { ...product, quantity: 1 } });
    } else {
      setActiveInlay({ type, product });
    }
  };

  const closeInlay = () => {
    setActiveInlay(null);
  };

  const handleCheckout = () => {
    setCheckoutMessage('Checkout successful! Here’s the receipt:');
    setCart([]);  // Optionally reset the cart after checkout
  };

  const renderProductList = (filter = null) => {
    return products
      .filter((product) => !filter || product.category === filter)
      .map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p className="product-price">${product.price}</p>
          <button onClick={() => openInlay('add', product)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      ));
  };

  return (
    <div className="shop-container">
      <h1>Shop</h1>

      {/* Cart Icon */}
      <div className="cart-icon" onClick={() => openInlay('cart')}>
        🛒 {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
      </div>

      {/* Product Sections */}
      <h2>Event-Related Products</h2>
      <div className="product-list">{renderProductList('event')}</div>

      <h2>All Products</h2>
      <div className="product-list">{renderProductList()}</div>

      {/* Inlays */}
      {activeInlay && (
        <div className="inlay">
          <div className="inlay-content">
            {activeInlay.type === 'add' && (
              <div>
                <h2>{activeInlay.product.name}</h2>
                <img
                  src={activeInlay.product.image}
                  alt={activeInlay.product.name}
                  className="product-image"
                />
                <p className="product-price">Price: ${activeInlay.product.price}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      setActiveInlay((prev) =>
                        prev
                          ? {
                              ...prev,
                              product: {
                                ...prev.product,
                                quantity: Math.max(1, prev.product.quantity - 1),
                              },
                            }
                          : prev
                      )
                    }
                  >
                    -
                  </button>
                  <span>{activeInlay.product.quantity}</span>
                  <button
                    onClick={() =>
                      setActiveInlay((prev) =>
                        prev
                          ? {
                              ...prev,
                              product: {
                                ...prev.product,
                                quantity: prev.product.quantity + 1,
                              },
                            }
                          : prev
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    addToCart(activeInlay.product, activeInlay.product.quantity);
                    closeInlay();
                  }}
                  className="confirm-button"
                >
                  Confirm
                </button>
                <button onClick={closeInlay} className="close-button">
                  Cancel
                </button>
              </div>
            )}

            {activeInlay.type === 'cart' && (
              <div>
                <h2>Your Cart</h2>
                {cart.length > 0 ? (
                  <>
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item">
                        <h3>{item.name}</h3>
                        <p>Price: ${item.price}</p>
                        <div className="quantity-controls">
                          <button onClick={() => updateCartQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, 1)}>+</button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="remove-button"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                    <h3>Total: ${calculateTotalPrice()}</h3>
                    <button onClick={handleCheckout} className="checkout-button">
                      Checkout
                    </button>
                  </>
                ) : (
                  <p>Your cart is empty.</p>
                )}
                <button onClick={closeInlay} className="close-button">
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      
    </div>
  );
};

export default Shop;
