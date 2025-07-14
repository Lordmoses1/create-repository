npm install mongoose
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect('mongodb://localhost/socialboost', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));