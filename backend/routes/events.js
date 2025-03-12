const express = require("express");
const { getAllEvents, createEvent, createEventUploadImage } = require("../controllers/eventController_.js");
const upload = require("../middlewares/eventMulter.js");

const router = express.Router();

// Get all posts
router
    .get("/", getAllEvents)
    .post("/create", upload.single("media"), createEvent);

// Submit a new post
// router.post("/events", addPost);

// Delete a post
// router.delete("/posts/:id", deletePost);

module.exports = router;
