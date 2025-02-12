const servicesRouter = require('./routes/services');
const forumRoutes = require("./routes/forum");

const PORT = 5000;

const express = require('express');
const app = express();

const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/services', servicesRouter);

app.use("/api", forumRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});