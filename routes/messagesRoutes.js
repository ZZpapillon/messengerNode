const express = require('express');
const router = express.Router();
const { getMessagesBetweenUsers, createMessage } = require('../controllers/messageController');
const verifyToken = require('../middlewares/verifyToken');

// Route to get messages between two users
router.get('/messages/:senderId/:recipientId', verifyToken, getMessagesBetweenUsers);
router.post('/messages', verifyToken, createMessage)
// Add more routes as needed for managing messages (e.g., send message, delete message, etc.)

module.exports = router;
