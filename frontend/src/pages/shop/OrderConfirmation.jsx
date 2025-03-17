import React from 'react';
import { useLocation, Link } from 'react-router';
import './OrderConfirmation.css'; // Create this CSS file for styling

const OrderConfirmation = () => {
  const location = useLocation();
  const bill = location.state?.bill; // Access bill from navigation state
  console.log({ bill });

  if (!bill) {
    return (
      <div className="order-confirmation-container">
        <h2>Order Confirmation</h2>
        <p>No order details found. Please try again.</p>
        <Link to="/shop">
          <button className="back-to-shop-button">Back to Shop</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="order-confirmation-container">
      <h2>Order Confirmation</h2>
      <p>Thank you for your purchase! Here are your order details:</p>
      <div className="order-details">
        <p><strong>Order ID:</strong> {bill.order_id}</p>
        <p><strong>User Email:</strong> {bill.user_email}</p>
        <p><strong>Delivery Address:</strong> {bill.delivery_address}</p>
        <h3>Items:</h3>
        <ul>
          {bill.items.map((item, index) => {
            console.log({ item });

            return (
              <li key={index}>
                Product ID: {item.product_id}
                <br />
                Product Name: {item.product_name}
                <br />
                Quantity: {item.quantity}
                <br />
                Price: ₹{item.price}
                <br />
                Total: ₹{item.total}
              </li>
            )
          })}
        </ul>
        <h3>Total Amount: ₹{bill.total_amount.toFixed(2)}</h3>
      </div>
      <Link to="/shop">
        <button className="back-to-shop-button">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default OrderConfirmation;