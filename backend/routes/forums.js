// routes/forums.js
const express = require("express");
const {
  getAllPosts,
  createPost,
  addComment,
} = require("../controllers/forumController");

const router = express.Router();

// Get all posts
router.get("/posts", getAllPosts);

// Create a new post
router.post("/posts", createPost);

// Add a comment to a post
router.post("/posts/:postId/comments", addComment);

module.exports = router;
