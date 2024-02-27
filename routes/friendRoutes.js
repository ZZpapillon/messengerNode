const express = require('express');
const router = express.Router();
const {addFriend, getAllFriends} = require('../controllers/friendController');
const verifyToken = require('../middlewares/verifyToken');
// Route to add a friend
router.post('/friends/add', verifyToken, addFriend);
router.get('/friends/:userId/friends', verifyToken, getAllFriends);
// Add more routes as needed for managing friends (e.g., remove friend, get friends list, etc.)

module.exports = router;
