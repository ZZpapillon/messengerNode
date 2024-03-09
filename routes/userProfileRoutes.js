const express = require('express');
const router = express.Router();
const multer = require('multer'); //

const upload = multer({
  storage: multer.diskStorage({
    destination: 'uploads/avatars',
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  }),
});

const { createUserProfile, updateUserProfile, getUserProfile, getUserProfiles } = require('../controllers/userProfileController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/user-profiles/:userId', verifyToken, getUserProfile);
router.get('/user-profiles', verifyToken, getUserProfiles);
router.post('/user-profiles', createUserProfile);
router.put('/user-profiles/:userId', verifyToken, upload.single('avatar'), updateUserProfile);

module.exports = router;


