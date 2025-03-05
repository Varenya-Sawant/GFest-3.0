const express = require("express");
const { loginMiddleware } = require("../controllers/loginController");

const router = express.Router();

// Get all posts
router
    .post("/", loginMiddleware);

module.exports = router;