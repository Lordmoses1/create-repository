npm install bcryptjs jsonwebtoken
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('./models/userModel');

// Register user
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, gender, profilePic, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ firstName, lastName, email, phone, gender, profilePic, password: hashedPassword });
    await user.save();

    res.status(201).send('User Registered');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');
  
  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  
  // Generate token
  const token = jwt.sign({ id: user._id }, 'secretkey', { expiresIn: '1h' });
  res.status(200).json({ token });
});

module.exports = router;