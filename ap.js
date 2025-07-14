const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const User = require('./models/User');  // Import the User model

// Initialize the app
const app = express();

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Multer for file uploads (Profile Picture)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory for file storage
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialboost', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting to MongoDB:", err));

// POST route to handle user registration
app.post('/user/register', upload.single('profilePic'), async (req, res) => {
    const { firstName, lastName, email, phone, gender } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    try {
        // Create a new user
        const newUser = new User({ firstName, lastName, email, phone, gender, profilePic });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(400).json({ message: 'Error registering user.', error: err });
    }
});

// Serve static files (for profile pictures)
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});