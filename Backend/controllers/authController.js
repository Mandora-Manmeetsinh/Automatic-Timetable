const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }



    // Create new user
    // Create new user
    user = new User({
      username: username || email, // Use email as username if not provided
      email,
      password,
    });

    await user.save();

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretjwtkey',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ message: 'User registered successfully', token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials: Email not found.' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials: Incorrect password.' });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'supersecretjwtkey',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ message: 'Logged in successfully', token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// User logout (optional, as JWTs are stateless)
exports.logout = (req, res) => {
  // For JWTs, logout typically involves client-side token removal.
  // On the server, you might blacklist tokens if you implement token revocation.
  res.status(200).json({ message: 'Logged out successfully (client-side token removal recommended)' });
};