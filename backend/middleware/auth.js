const jwt = require('jsonwebtoken');
const connection = require('../mysql');

const authMiddleware = (requiredRole) => async (req, res, next) => {
  // Validate and extract token
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided or invalid format' });
  }
  const token = authHeader.split(' ')[1];

  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Fetch user types from database
    const [userTypes] = await connection.query(
      'SELECT user_type FROM user_types WHERE user_email = ?',
      [decoded.email]
    );
    const userTypeList = userTypes.map((type) => type.user_type);

    // Check if user has any roles
    if (userTypeList.length === 0) {
      return res.status(403).json({ message: 'User has no assigned roles' });
    }

    // Check required role
    if (requiredRole && !userTypeList.includes(requiredRole)) {
      return res.status(403).json({ message: 'Access denied: insufficient permissions' });
    }

    next();
  } catch (error) {
    console.error('Auth error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired, please log in again' });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      return res.status(500).json({ message: 'Server error during authentication' });
    }
  }
};

module.exports = authMiddleware;