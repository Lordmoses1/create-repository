const express = require('express');
const router = express.Router();

// Mock database
let users = [];

// User registration
router.post('/register', (req, res) => {
  const { firstName, lastName, email, phone, gender, profilePic } = req.body;
  const user = { firstName, lastName, email, phone, gender, profilePic, tasks: [] };
  users.push(user);
  res.status(201).send('User Registered');
});

// User login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(404).send('User not found');
  }
});

module.exports = router;