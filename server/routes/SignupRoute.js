const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

// Signup route
router.post('/signup', signupController.signup);

module.exports = router;
