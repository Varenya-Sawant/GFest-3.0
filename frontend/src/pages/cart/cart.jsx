import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css'; // Optional CSS file

const Cart = () => {
  const [cart, setCart] = useState({ cartItems: [], totalPrice: 0 });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3000/api/cart', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` },
        });
        setCart(response.data);
      } catch (err) {
        setError('Failed to fetch cart. Please log in or try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      await axios.put(
        'http://localhost:3000/api/cart',
        { cart_item_id: cartItemId, cart_quantity: newQuantity },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } }
      );
      setCart((prev) => ({
        ...prev,
        cartItems: prev.cartItems.map((item) =>
          item.cart_item_id === cartItemId ? { ...item, cart_quantity: newQuantity } : item
        ),
        totalPrice: prev.cartItems.reduce(
          (total, item) =>
            total + (item.cart_item_id === cartItemId ? newQuantity : item.cart_quantity) * item.product_price,
          0
        ),
      }));
    } catch (err) {
      setError('Failed to update cart');
    }
  };

  const handleCheckout = async () => {
    try {
      const deliveryAddress = prompt('Enter your delivery address:');
      if (!deliveryAddress) return;

      const response = await axios.post(
        'http://localhost:3000/api/checkout',
        { order_delivery_address: deliveryAddress },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } }
      );
      alert(response.data.message);
      setCart({ cartItems: [], totalPrice: 0 }); // Clear cart on success
    } catch (err) {
      setError('Checkout failed. Please try again.');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cart.cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.cartItems.map((item) => (
            <div key={item.cart_item_id} className="cart-item">
              <img src={item.product_media_link || 'https://via.placeholder.com/100'} alt={item.product_name} />
              <h3>{item.product_name}</h3>
              <p>Price: ₹{item.product_price}</p>
              <p>
                Quantity:{' '}
                <input
                  type="number"
                  min="0"
                  value={item.cart_quantity}
                  onChange={(e) => updateQuantity(item.cart_item_id, Number(e.target.value))}
                  className="quantity-input"
                />
              </p>
              <p>Subtotal: ₹{item.cart_quantity * item.product_price}</p>
            </div>
          ))}
          <h3>Total: ₹{cart.totalPrice.toFixed(2)}</h3>
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;