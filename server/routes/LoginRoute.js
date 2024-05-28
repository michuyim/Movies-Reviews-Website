const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Login route
router.post('/login', loginController.login);

module.exports = router;
