const express = require('express');
const router = express.Router();
const { login, register, signout, getAllUsers } = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');

// POST route for user login
router.post('/login', login);
router.get('/users',verifyToken, getAllUsers)
// POST route for user registration
router.post('/register', register);

// POST route for user sign-out

module.exports = router;
