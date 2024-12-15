const express = require('express');
const { getAllServices, addNewService } = require('../controllers/servicesController');

const router = express.Router();

// Route to GET all mock services
router.get('/', getAllServices);

// Route to POST a new mock service
router.post('/', addNewService);

module.exports = router;
