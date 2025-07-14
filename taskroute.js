const express = require('express');
const router = express.Router();

// Mock task data
let tasks = [];

// Create task
router.post('/create', (req, res) => {
  const { taskName, socialMedia, quantity, userId } = req.body;
  const task = { taskName, socialMedia, quantity, userId, status: 'pending' };
  tasks.push(task);
  res.status(201).send('Task Created');
});

// Update task status
router.post('/approve', (req, res) => {
  const { taskId, status } = req.body;
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.status = status;
    res.status(200).send('Task status updated');
  } else {
    res.status(404).send('Task not found');
  }
});

module.exports = router;