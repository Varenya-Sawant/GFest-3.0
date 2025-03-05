const express = require("express");
const { userRegistrationMiddleware } = require("../controllers/signupController");


const router = express.Router();

// Get all posts
router
.post("/", userRegistrationMiddleware);

module.exports = router;
