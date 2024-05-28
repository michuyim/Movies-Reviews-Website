const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

// Protected route example
router.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;