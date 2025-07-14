require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const helmet = require('helmet');

// Initialize the app
const app = express();
app.use(helmet());

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ensure 'uploads' directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);
        if (extName && mimeType) {
            return cb(null, true);
        } else {
            cb(new Error('Only .jpeg, .jpg, and .png files are allowed!'));
        }
    }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialboost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Model
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    gender: String,
    profilePic: String,
});

const User = mongoose.model('User', userSchema);

// POST route to handle user registration
app.post('/user/register', upload.single('profilePic'), async (req, res) => {
    const { firstName, lastName, email, phone, gender } = req.body;
    const profilePic = req.file ? req.file.filename : null;

    try {
        const newUser = new User({ firstName, lastName, email, phone, gender, profilePic });
        await newUser.save();
        res.status(201).json({ 
            message: 'User registered successfully!', 
            user: { firstName, lastName, email, phone, gender, profilePic } 
        });
    } catch (err) {
        res.status(400).json({ message: 'Error registering user.', error: err });
    }
});

// Serve static files
app.use('/uploads', express.static(uploadDir));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});