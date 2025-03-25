const express = require('express');
const { addProduct } = require('../controllers/productController'); // Removed getCategories
const authMiddleware = require('../middleware/auth');
const productUpload = require('../middlewares/productMulter');

const router = express.Router();

// Removed: router.get('/categories', getCategories);
router.post('/', /* authMiddleware('SELLER'), */ productUpload.single('product_image_link'), addProduct);

module.exports = router;