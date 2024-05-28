const jwt = require('jsonwebtoken');
const User = require('../model/Users');

const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401); // No token, unauthorized

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) return res.sendStatus(403); // Invalid token, forbidden

    try {
      const user = await User.findById(decoded.userId);
      if (!user) return res.sendStatus(404); // User not found
      req.user = user; // Attach user to request
      next(); // Pass execution to the next middleware or route handler
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
};

module.exports = authenticateToken;