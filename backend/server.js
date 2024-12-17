const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const servicesRouter = require('./routes/services');
const forumRoutes = require('./routes/forums'); // Updated path for the forum routes

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/services', servicesRouter);
app.use('/forum', forumRoutes); // Prefix `/forum` here

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
