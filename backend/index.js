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
app.use('/services', require('./routes/services'));
app.use('/api/products', require('./routes/product'));
app.use('/api/shop/', require('./routes/shop'));
app.use('/api/seller/products', require('./routes/product'));
app.use('/api/forum', require("./routes/forum"));
app.use('/api/admin', require('./routes/admin'));

// Keep error-handling middleware last
app.use((req, res, next) => {
  res.status(404).send('Route not found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://192.168.6.58:${PORT}`);
});