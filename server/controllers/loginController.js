const bcrypt = require('bcryptjs');
const User = require('../model/Users');
const jwt = require('jsonwebtoken');

// Controller for user login
exports.login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
  
      // Generate a JWT Token with a short expiration time
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Set token in HTTPs-only, Secure cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 60 * 60 * 1000 // 15 minutes
      });
  
      res.json({ msg: 'Login successful' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };