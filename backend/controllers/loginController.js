const { createHash } = require('node:crypto');
const connection = require('../mysql'); // Your MySQL connection file
const jwt = require('jsonwebtoken'); // For token generation

const loginMiddleware = async (req, res, next) => {
  const { email, password } = req.body;


  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Fetch user from database
    const [users] = await connection.query(
      'SELECT user_email, user_password FROM users WHERE user_email = ?',
      [email]
    );


    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];
    const hashedPassword = createHash('sha3-512')
      .update(password, 'utf-8')
      .digest('hex');

    // Verify password
    if (hashedPassword !== user.user_password) {
      
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Fetch user types
    const [userTypes] = await connection.query(
      'SELECT user_type FROM user_types WHERE user_email = ?',
      [email]
    );
    const userTypeList = userTypes.map((type) => type.user_type);
    

    // Generate JWT token (optional, for session management)
    const token = jwt.sign(
      { email: user.user_email, userTypes: userTypeList },
      'your-secret-key', // Replace with a secure secret key
      { expiresIn: '1h' }
    );

    // Respond with success and token
    return res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        email: user.user_email,
        userTypes: userTypeList
      }
    });

  } catch (error) {
    console.error('ERROR during login:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
};

// Usage in Express route
// app.post('/api/login', loginMiddleware);

module.exports = { loginMiddleware };