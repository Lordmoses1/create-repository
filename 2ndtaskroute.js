const express = require('express');
const router = express.Router();
const Task = require('./models/taskModel');
const User = require('./models/userModel');

// Create task
router.post('/create', async (req, res) => {
  try {
    const { taskName, socialMedia, quantity, userId } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found');

    const task = new Task({ taskName, socialMedia, quantity, userId: user._id });
    await task.save();

    res.status(201).send('Task created successfully');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get all tasks for a user
router.get('/:userId/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId }).populate('workers');
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Update task status (Approve/Reject)
router.post('/update/:taskId', async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).send('Task not found');

    task.status = status;
    await task.save();

    res.status(200).send('Task status updated');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

module.exports = router;