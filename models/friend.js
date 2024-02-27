const mongoose = require('mongoose');

const friendSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile' // Change the reference to UserProfile
  },
  friend: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile' // Change the reference to UserProfile
  }
});

const Friendship = mongoose.model('Friendship', friendSchema);

module.exports = Friendship;

