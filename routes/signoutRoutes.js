const express = require('express');
const router = express.Router();
const { signout } = require('../controllers/userController');

router.post('/', signout);

module.exports = router;