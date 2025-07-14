const express = require('express');
const authenticate = require('./authMiddleware');
const Task = require('./models/taskModel');

const router = express.Router();

// Only authenticated users can create tasks
router.post('/create', authenticate, async (req, res) => {
  try {
    const { taskName, socialMedia, quantity } = req.body;
    const userId = req.user.id;  // From the JWT token

    const task = new Task({
      taskName,
      socialMedia,
      quantity,
      userId: userId
    });

    await task.save();
    res.status(201).send('Task created successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;