const express = require('express');
const router = express.Router();

// Import controllers
const {
  getAllProducts,
  getProductById,
  addProduct,
  getCategories, // Added for categories endpoint
} = require('../controllers/productController.js');
const {
  addToCart,
  getCart,
  updateCartItem,
  checkout,
  removeCartItem, // Added for remove cart item endpoint
} = require('../controllers/orderControllers');
const productUpload = require('../middlewares/productMulter.js'); // Middleware for image upload

// Product Routes (public)
router.get('/products/categories', getCategories); // Get all categories for filters
router.get('/products', getAllProducts); // Get all products with filters
router.get('/products/:id', getProductById); // Get product details by ID

// Add product route (authenticated, for SELLER only)
router.post(
  '/seller/products',
  // authMiddleware('SELLER'),
  productUpload.single('product_image_link'),
  addProduct
);

// Cart Routes (authenticated, for COMMON_USER)
router.post('/cart',
  // authMiddleware('COMMON_USER'),
  addToCart); // Add product to cart

router.get('/cart',
  // authMiddleware('COMMON_USER'),
  getCart); // Get cart items

router.post('/cart/update',
  // authMiddleware('COMMON_USER'),
  updateCartItem); // Update cart item quantity

router.post('/cart/checkout',
  // authMiddleware('COMMON_USER'),
  checkout); // Process checkout

router.post('/cart/remove',
  // authMiddleware('COMMON_USER'),
  removeCartItem); // Remove cart item


module.exports = router;