const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post(
  '/signup',
  [
    body('username', 'Username must be at least 3 characters long').trim().isLength({ min: 3 }),
    body('email', 'Please include a valid email').trim().isEmail(),
    body('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user already exists (by email or username)
      let user = await User.findOne({ $or: [{ email }, { username }] });
      if (user) {
        if (user.email === email.toLowerCase()) {
          return res.status(400).json({ message: 'User with this email already exists' });
        }
        return res.status(400).json({ message: 'Username is already taken' });
      }

      // Create new user
      user = new User({
        username,
        email,
        password
      });

      // Hash password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save user
      await user.save();

      // Generate JWT
      const payload = {
        userId: user._id,
        username: user.username,
        email: user.email
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET || 'super_secret_jwt_key_123_abc',
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post(
  '/login',
  [
    body('email', 'Please include a valid email').trim().isEmail(),
    body('password', 'Password is required').exists()
  ],
  async (req, res, next) => {
    // Validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const payload = {
        userId: user._id,
        username: user.username,
        email: user.email
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
