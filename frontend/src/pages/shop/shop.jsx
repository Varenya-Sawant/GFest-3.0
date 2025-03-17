import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import './Shop.css'; // Existing CSS file, updated below

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    isAvailable: '',
  });

  useEffect(() => {
    console.log({ products });


  }, [products])


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const queryParams = new URLSearchParams();
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
        if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
        if (filters.isAvailable) queryParams.append('isAvailable', filters.isAvailable);


        const response = await axios.get(
          // `http://localhost:3000/api/shop/products?${queryParams.toString()}`
          `http://localhost:3000/api/shop/products`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/shop/products/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      isAvailable: '',
    });
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="shop-container">
      <h2>Shop - All Products</h2>
      <div className="filters">
        <label>
          Category:
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All</option>
            {categories.map((cat) => (
              <option key={cat.product_category_id} value={cat.product_category_name}>
                {cat.product_category_name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Min Price:
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleFilterChange}
            placeholder="Min"
            min="0"
          />
        </label>
        <label>
          Max Price:
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
            placeholder="Max"
            min="0"
          />
        </label>
        <label>
          Availability:
          <select name="isAvailable" value={filters.isAvailable} onChange={handleFilterChange}>
            <option value="">All</option>
            <option value="1">Available</option>
            <option value="0">Not Available</option>
          </select>
        </label>
        <button onClick={handleClearFilters} className="clear-filters-button">
          Clear Filters
        </button>
      </div>
      {products.length === 0 ? (
        <p>No products match your filters.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => {
            console.log({ product });
            
            return (
            <div key={product.product_id} className="product-card">
              <h3>{product.product_name}</h3>
              {product.image_link ? (
                <img
                  src={product.image_link}
                  alt={product.product_name}
                  className="product-image"
                />
              ) : (
                <div className="no-image">No image available</div>
              )}
              <p>{product.product_description}</p>
              <p>Price: ₹{product.product_price}</p>
              <p>Stock: {product.product_stock}</p>
              <p>Category: {product.product_category_name}</p>
              <Link to={`/products/${product.product_id}`}>
                <button className="view-details-button">View Details</button>
              </Link>
            </div>
          )})}
        </div>
      )}
    </div>
  );
};

export default Shop;