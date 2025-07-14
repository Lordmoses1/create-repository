const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const userRoutes = require('./backend/userRoutes');
const taskRoutes = require('./backend/taskRoutes');
const adminRoutes = require('./backend/adminRoutes');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

// Routes
app.use('/user', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/admin', adminRoutes);

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});