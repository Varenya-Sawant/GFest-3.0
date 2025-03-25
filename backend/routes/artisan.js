const express = require("express");
const { getAllArtisans, getArtisanByEmail } = require("../controllers/artisanController.js");
const upload = require("../middlewares/eventMulter.js");

const router = express.Router();

// Get all posts
router
    .get("/", getAllArtisans)
    .get("/:email", getArtisanByEmail);

// Submit a new post
// router.post("/events", addPost);

// Delete a post
// router.delete("/posts/:id", deletePost);
 

module.exports = router;
