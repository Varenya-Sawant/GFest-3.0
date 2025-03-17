import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import './ProductDetails.css'; // Create this CSS file for styling

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/shop/products/${id}`);
        setProduct(response.data[0]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!localStorage.getItem('user_email')) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    try {
      await axios.post(
        'http://localhost:3000/api/shop/cart',
        { product_id: id, quantity, email: localStorage.getItem('user_email') },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Product added to cart successfully!');
      navigate('/cart'); // Redirect to cart page
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  if (loading) return <div>Loading product...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  return (
    <div className="product-details-container">
      <h2>{product.product_name}</h2>
      <div className="product-details-content">
        <div className="product-images">
          {product.image_link ? (
            <img
              src={product.image_link}
              alt={product.product_name}
              className="product-image"
            />
          ) : (
            <div className="no-image">No images available</div>
          )}
        </div>

        <div className="product-info">
          <p><strong>Description:</strong> {product.product_description}</p>
          <p><strong>Price:</strong> ₹{product.product_price}</p>
          <p><strong>Stock:</strong> {product.product_stock}</p>
          <p><strong>Category:</strong> {product.product_category_name}</p>
          <p><strong>Seller:</strong> {product.seller_email}</p>
          <p><strong>Available:</strong> {product.product_isAvailable ? 'Yes' : 'No'}</p>
          {product.product_stock > 0 && (
            <div className="add-to-cart">
              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  max={product.product_stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.product_stock, parseInt(e.target.value) || 1)))}
                />
              </label>

              <button onClick={handleAddToCart} className="add-to-cart-button">
                Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;