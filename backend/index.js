const forumRoutes = require("./routes/forum");

const PORT = 3000;

const express = require('express');
const app = express();
exports.app = app;

const cors = require('cors');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/events', require('./routes/events'));
app.use('/api/artisans', require('./routes/artisan'));
app.use('/services', require('./routes/services')); // Corrected to require('./routes/services')
app.use('/api/products', require('./routes/product')); // Corrected to match productRoutes import
app.use('/api/shop/', require('./routes/shop')); // Changed to /api/shop to avoid conflict with /api/shop/products
app.use('/api', forumRoutes);

// Keep error-handling middleware last
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});