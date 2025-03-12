const multer = require('multer');
const path = require('path');

// Configure Multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }).array('images', 10); // Max 10 images

const uploadImage = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Image upload failed', error: err.message });
    }
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    const imageLinks = req.files.map((file) => `/uploads/${file.filename}`);
    res.status(200).json({ message: 'Images uploaded successfully', imageLinks });
  });
};

module.exports = { uploadImage };