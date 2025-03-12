const servicesRouter = require('./routes/services');
const forumRoutes = require("./routes/forum");

const PORT = 3000;

const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Routes
app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/events', require('./routes/events'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/services', servicesRouter);

app.use("/api", forumRoutes);

// Keeps these 2 last always
app.use((req, res, next) => {
  res.status(404).send("Route not found");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});