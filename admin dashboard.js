// Admin route to view all tasks
router.get('/admin/tasks', authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user.role !== 'admin') {
    return res.status(403).send('Access Denied');
  }

  const tasks = await Task.find().populate('userId');
  res.status(200).json(tasks);
});