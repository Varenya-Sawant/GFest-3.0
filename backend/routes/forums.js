const express = require('express');
const { getAllPosts, createPost } = require('../controllers/forumController');

const router = express.Router();

// Route to get all forum posts
router.get('/', (req, res) => {
  console.log("GET /forum route hit");
  getAllPosts(req, res);
});

// Route to create a new forum post
router.post('/', (req, res) => {
  console.log("POST /forum route hit");
  createPost(req, res);
});

module.exports = router;
