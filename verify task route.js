router.post('/verify-task/:taskId', authenticate, async (req, res) => {
  const { status, comment } = req.body;
  const task = await Task.findById(req.params.taskId);
  
  if (!task) return res.status(404).send('Task not found');
  
  // Ensure admin is verifying the task
  const user = await User.findById(req.user.id);
  if (user.role !== 'admin') {
    return res.status(403).send('Access Denied');
  }

  if (status === 'approved') {
    task.status = 'approved';
  } else if (status === 'rejected') {
    task.status = 'rejected';
    task.comment = comment;  // Store rejection comment
  }
  
  await task.save();
  res.status(200).send('Task verification status updated');
});