import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const email = localStorage.getItem('user_email');

  useEffect(() => {
    const fetchCart = async () => {
      if (!email) {
        setError('Please log in to view your cart.');
        setLoading(false);
        navigate('/login');
        return;
      };

      try {
        const response = await axios.get('http://192.168.6.58:3000/api/shop/cart', {
          params: { email },
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setCartItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to load cart. Please try again later.');
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleQuantityChange = async (cartItemId, newQuantity, productId) => {
    try {
      await axios.post(
        'http://192.168.6.58:3000/api/shop/cart/update',
        { cart_item_id: cartItemId, quantity: newQuantity, product_id: productId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cart_item_id === cartItemId ? { ...item, cart_quantity: newQuantity } : item
        )
      );
      alert('Cart item updated successfully!');
    } catch (err) {
      console.error('Error updating cart item:', err);
      alert('Failed to update cart item. Please try again.\n' + err.message);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      const response = await axios.post(
        'http://192.168.6.58:3000/api/shop/cart/remove',
        { cart_item_id: cartItemId, email: email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cart_item_id !== cartItemId)
      );
      alert('Cart item removed successfully!');
    } catch (err) {
      console.error('Error removing cart item:', err);
      alert('Failed to remove cart item. Please try again.');
    }
  };

  const handleCheckout = async () => {
    if (!deliveryAddress) {
      alert('Please enter a delivery address.');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.6.58:3000/api/shop/cart/checkout',
        { delivery_address: deliveryAddress, email: email },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );


      alert('Checkout successful!');
      setCartItems([]); // Clear cart on frontend
      setDeliveryAddress(''); // Reset delivery address
      navigate('/order-confirmation', { state: { bill: response.data.bill } });
    } catch (err) {
      console.error('Error during checkout:', err);
      if (err.status == 406)
        alert(err.response.data.message);
      else alert('Failed to checkout. Please try again.');
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (error) return <div>{error}</div>;

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.cart_quantity * item.product_price,
    0
  );

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.cart_item_id} className="cart-item">
                {item.image_link && item.image_link.length > 0 ? (
                  <img
                    src={item.image_link}
                    alt={item.product_name}
                    className="cart-item-image"
                  />
                ) : (
                  <div className="no-image">No image available</div>
                )}
                <div className="cart-item-details">
                  <h3>{item.product_name}</h3>
                  <p>Price: ₹{item.product_price}</p>
                  <p>Stock: {item.product_stock}</p>
                  <label>
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      max={item.product_stock}
                      value={item.cart_quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.cart_item_id,
                          Math.max(1, Math.min(item.product_stock, parseInt(e.target.value) || 1)),
                          item.product_id
                        )
                      }
                    />
                  </label>
                  <p>Subtotal: ₹{(item.cart_quantity * item.product_price).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveItem(item.cart_item_id)}
                    className="remove-item-button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: ₹{totalAmount.toFixed(2)}</h3>
            <div className="delivery-address">
              <label>
                Delivery Address:
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                />
              </label>
            </div>
            <button onClick={handleCheckout} className="checkout-button">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;