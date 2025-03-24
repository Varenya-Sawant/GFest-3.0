const express = require('express');
const router = express.Router();
// const auth = require('../middleware/auth');
const {
  getPendingSellers,
  getPendingHosts,
  approveSeller,
  rejectSeller,
  approveHost,
  rejectHost,
} = require('../controllers/adminController');

// Apply authentication middleware to all routes
// router.use(auth);

// Routes
router.get('/sellers/pending', getPendingSellers);
router.get('/hosts/pending', getPendingHosts);
router.post('/sellers/approve', approveSeller);
router.post('/sellers/reject', rejectSeller);
router.post('/hosts/approve', approveHost);
router.post('/hosts/reject', rejectHost);

module.exports = router;