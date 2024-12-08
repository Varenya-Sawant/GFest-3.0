const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Gfest Backend!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
