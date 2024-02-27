const Friendship = require('../models/friend.js');
const UserProfile = require('../models/userProfile.js');

exports.addFriend = async (req, res, next) => {
  try {
    const { userId, friendId } = req.body;

    // Check if the friendship already exists
    const existingFriendship = await Friendship.findOne({
      $or: [
        { user: userId, friend: friendId },
        { user: friendId, friend: userId }
      ]
    });

    if (existingFriendship) {
      return res.status(400).json({ message: 'Friendship already exists' });
    }

    // Create friendship records between the user profiles of the two users
    const friendship1 = await Friendship.create({
      user: userId,
      friend: friendId
    });

    const friendship2 = await Friendship.create({
      user: friendId,
      friend: userId
    });

    // Assuming you want to return the updated list of friends after adding
    // Retrieve the user profiles of the users involved in the friendship
    const userProfile1 = await UserProfile.findById(userId);
    const userProfile2 = await UserProfile.findById(friendId);

    res.status(200).json({
      message: 'Friend added successfully',
      friendships: [friendship1, friendship2],
      userProfile1,
      userProfile2
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllFriends = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    // Find all friendship records where the user is the user
    const friendships = await Friendship.find({ user: userId }).populate({
      path: 'friend',
      select: 'firstName lastName avatar bio' // Specify the fields you want to retrieve
    });

    // Extract friend details from populated fields
    const friends = friendships.map(friendship => friendship.friend);

    res.status(200).json({ friends });
  } catch (error) {
    next(error);
  }
};

