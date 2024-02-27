const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ id: user._id, username: user.firstName }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ firstName, lastName, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token for the newly registered user
        const token = jwt.sign({ id: newUser._id, username: newUser.firstName }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return the token along with success message
        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        next(error);
    }
};

exports.signout = async (req, res, next) => {
    try {
        // Here you may want to perform any additional cleanup or logging related to the sign-out process
        res.clearCookie('jwt'); // Clear the JWT cookie
        res.status(200).json({ message: 'User signed out successfully' });
    } catch (error) {
        next(error);
    }
};


exports.getAllUsers = async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, { password: 0 }); // Exclude password field from the response

    res.status(200).json(users); // Send the retrieved users as a JSON response
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};