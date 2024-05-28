const bcrypt = require('bcryptjs');
const User = require('../model/Users');
const jwt = require('jsonwebtoken');

// Controller for user signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already in use' });
    }

    // Create and save the user
    const user = new User({ username, email, password });
    await user.save();
    res.status(201).json({ msg: 'User Created Successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Something went wrong: ${err.message}` });
  }
};
