import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    product_description: '',
    product_price: '',
    product_stock: '',
    // product_isAvailable: true,
    product_category_name: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: checked }));
      // } else if (type === 'file') {
      //   setFormData((prev) => ({ ...prev, product_media_link: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    // Filter out invalid files
    const validFiles = files.filter((file) => validImageTypes.includes(file.type));

    // If there are invalid files, show an error
    if (files.length !== validFiles.length) {
      alert('Please select only image files (jpeg, jpg, png).');
    }

    // Update the state with valid files and generate image previews
    setImages(validFiles);
    const previews = validFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };


  const validateForm = () => {
    let newErrors = {};

    if (!formData.product_name.trim()) newErrors.product_name = 'Product name is required';
    if (!formData.product_description.trim()) newErrors.product_description = 'Description is required';
    if (!formData.product_price || isNaN(formData.product_price) || formData.product_price <= 0)
      newErrors.product_price = 'Valid price is required';
    if (!formData.product_stock || isNaN(formData.product_stock) || formData.product_stock <= 0)
      newErrors.product_stock = 'Valid stock quantity is required';
    if (!formData.product_category_name.trim()) newErrors.product_category_name = 'Category name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const product_isAvailable = formData.product_stock > 0;

    const data = new FormData();
    data.append('product_name', formData.product_name);
    data.append('product_description', formData.product_description);
    data.append('product_price', formData.product_price);
    data.append('product_stock', formData.product_stock);
    data.append('product_isAvailable', product_isAvailable);
    data.append('product_category_name', formData.product_category_name);
    data.append('seller_email', localStorage.getItem('user_email'));

    images.forEach((image, index) => {
      data.append('product_image_link', image);

      data.append('product_image_link_details', JSON.stringify({
        uri: imagePreviews[index],
        type: image.type,
        name: image.name
      }));
    });

    try {

      const response = await axios.post(
        `http://192.168.152.58:3000/api/seller/products`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setSuccess('Product added successfully!');
      setFormData({
        product_name: '',
        product_description: '',
        product_price: '',
        product_stock: '',
        product_isAvailable: true,
        product_category_name: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding product:', error);
      setErrors({ server: error.response?.data?.message || 'Failed to add product' });
    }
  };

  return (
    <div className="seller-dashboard">
      <h2>Seller Dashboard - Add Product</h2>
      {success && <p className="success">{success}</p>}
      {errors.server && <p className="error">{errors.server}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
          />
          {errors.product_name && <span className="error">{errors.product_name}</span>}
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="product_description"
            value={formData.product_description}
            onChange={handleChange}
          />
          {errors.product_description && <span className="error">{errors.product_description}</span>}
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="product_price"
            value={formData.product_price}
            onChange={handleChange}
            step="1"
          />
          {errors.product_price && <span className="error">{errors.product_price}</span>}
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="product_stock"
            value={formData.product_stock}
            onChange={handleChange}
            step="1"
          />
          {errors.product_stock && <span className="error">{errors.product_stock}</span>}
        </div>
        <div>
          <label>Category Name:</label>
          <input
            type="text"
            name="product_category_name"
            value={formData.product_category_name}
            onChange={handleChange}
            placeholder="Enter category name"
          />
          {errors.product_category_name && <span className="error">{errors.product_category_name}</span>}
        </div>
        <div>
          <label>Product Image:</label>
          <input
            type="file"
            name="product_media_link"
            accept="image/jpeg,image/png,image/jpg"
            // value={formData.product_media_link}
            onChange={handleImageChange}
          />

          <div className="image-previews">
            {imagePreviews.map((preview, index) => (
              <img key={index} src={preview} alt="Preview" style={{ width: '100px', margin: '5px' }} />
            ))}
          </div>

          {errors.product_media_link && <span className="error">{errors.product_media_link}</span>}
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default SellerDashboard;