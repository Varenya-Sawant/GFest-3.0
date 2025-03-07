const express = require("express");
const { profileMiddleware } = require("../controllers/profileController");

const router = express.Router();

// Get all posts
router
    .post("/", profileMiddleware);

module.exports = router;