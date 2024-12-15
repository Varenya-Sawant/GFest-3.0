const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const servicesRouter = require('./routes/services');
const forumRoutes = require('./routes/forums'); // Import the forum routes

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use('/services', servicesRouter);
app.use('/forum', forumRoutes); // Prefix `/forum` here

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
