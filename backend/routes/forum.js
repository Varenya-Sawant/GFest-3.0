const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const postUpload = require('../middlewares/postMulter'); // Middleware for image upload (similar to productMulter)

const {
  getAllPosts,
  createPost,
  getPostById,
  // updatePost,
  deletePost,
  addComment,
  updateComment,
  deleteComment,
} = require('../controllers/forumController');

router.get('/posts', getAllPosts); // Get all posts with pagination
router.post('/posts',/* authMiddleware('COMMON_USER'), */ postUpload.single('post_image_name'), createPost); // Create a post
router.get('/posts/:id', getPostById); // Get post details by ID
router.post('/posts/:id', /* authMiddleware('COMMON_USER'), */postUpload.single('post_image_name'), createPost); // Update a post
router.delete('/posts/:id', /* authMiddleware('COMMON_USER'), */ deletePost); // Delete a post
router.post('/comments', /* authMiddleware('COMMON_USER'), */ addComment); // Add a comment
router.put('/comments', /* authMiddleware('COMMON_USER'), */ updateComment); // Update a comment
router.delete('/comments', /* authMiddleware('COMMON_USER'), */ deleteComment); // Delete a comment

module.exports = router;