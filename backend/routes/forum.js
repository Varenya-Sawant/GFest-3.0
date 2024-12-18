const express = require("express");
const {
  getPosts,
  addPost,
  deletePost,
  addComment,
  editComment,
  deleteComment,
} = require("../controllers/forumController");

const router = express.Router();

// Get all posts
router.get("/posts", getPosts);

// Submit a new post
router.post("/posts", addPost);

// Delete a post
router.delete("/posts/:id", deletePost);

// Add a comment
router.post("/posts/:postId/comments", addComment);

// Edit a comment
router.put("/posts/:postId/comments/:commentId", editComment);

// Delete a comment
router.delete("/posts/:postId/comments/:commentId", deleteComment);

module.exports = router;
