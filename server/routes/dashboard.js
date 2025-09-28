const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

router.get('/patient', verifyToken, requireRole('patient'), (req, res) => {
  res.json({ message: 'Welcome to patient dashboard' });
});

router.get('/doctor', verifyToken, requireRole('doctor'), (req, res) => {
  res.json({ message: 'Welcome to doctor dashboard' });
});

router.get('/admin', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome to admin dashboard' });
});

module.exports = router;