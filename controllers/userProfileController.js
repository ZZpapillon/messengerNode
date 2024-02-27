const UserProfile = require('../models/userProfile');
const multer = require('multer');


exports.createUserProfile = async (req, res, next) => {
    try {
        // Extract user profile data from the request body
        const { userId, firstName, lastName, avatar, bio } = req.body;

        // Create a new user profile object
        const newUserProfile = new UserProfile({
            userId,
            firstName,
            lastName,
            avatar,
            bio
        });

        // Save the new user profile to the database
        await newUserProfile.save();

        // Return success response
        res.status(201).json({ message: 'User profile created successfully', userProfile: newUserProfile });
    } catch (error) {
        // Handle errors
        next(error);
    }
};

exports.getUserProfile = async (req,res, next) => {
   try {
      const userId = req.params.userId;
      const userProfile = await UserProfile.findOne({ userId }); // Find the user profile with the specified user ID
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }
           res.json(userProfile)

   } catch (error) {
        next(error);
    }
}

exports.updateUserProfile = async (req, res, next) => {
  try {
    console.log(req.file)
    const { bio } = req.body;
    const userId = req.params.userId;

    // Find the user profile with the specified user ID
    let userProfile = await UserProfile.findOne({ userId });

    // Check if the user profile exists
    if (!userProfile) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // Update the bio field
    if (bio) userProfile.bio = bio;

    // Check if there is a file uploaded
    if (req.file) {
      // Log the file object
      console.log('File uploaded:', req.file);

      // Assuming the file path is stored in req.file.path
      userProfile.avatar = req.file.path;
    }

    // Save the updated user profile
    userProfile = await userProfile.save();

    // Send a success response with the updated user profile
    res.status(200).json({ message: 'User profile updated successfully', userProfile });
  } catch (error) {
    next(error); // Forward any errors to the error handling middleware
  }
};

exports.getUserProfiles = async (req, res, next) => {
  try {
    const userProfiles = await UserProfile.find();
    res.status(200).json(userProfiles);
  } catch (error) {
    next(error);
  }
};