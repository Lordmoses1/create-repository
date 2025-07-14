const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    gender: String,
    profilePic: String,  // Path to the uploaded profile picture
});

const User = mongoose.model('User', userSchema);

module.exports = User;