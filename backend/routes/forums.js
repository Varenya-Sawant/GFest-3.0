const express = require("express");
const {
  getAllPosts,
  createPost,
  deletePost,
  addComment,
  deleteComment,
  editComment,
} = require("../controllers/forumController");

const router = express.Router();

// Routes
router.get("/", getAllPosts);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.post("/:id/comments", addComment);
router.delete("/:postId/comments/:commentId", deleteComment);
router.put("/:postId/comments/:commentId", editComment);

module.exports = router;
