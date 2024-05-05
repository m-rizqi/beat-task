const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

async function signUp(userData) {
    try {
        const user = new User(userData);
        await user.save();
        return 'User signed up successfully';
    } catch (error) {
        throw new Error('Error while signing up user');
    }
}

async function signIn(username, password) {
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            throw new Error('Invalid username or password');
        }
        const token = jwt.sign({ userId: user._id }, config.JWT_SECRET);
        return token;
    } catch (error) {
        throw new Error('Error while signing in user');
    }
}

module.exports = {
    signUp,
    signIn
};
