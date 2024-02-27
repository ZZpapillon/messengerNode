const Message = require('../models/message');

exports.createMessage = async (req, res) => {
  try {
    const { senderId, recipientId, content } = req.body;
    const message = new Message({ senderId, recipientId, content });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
};

exports.getMessagesBetweenUsers = async (req, res, next) => {
  try {
    const { senderId, recipientId } = req.params;

    // Fetch messages between the specified sender and recipient
    const messages = await Message.find({
      $or: [
        { senderId, recipientId },
        { senderId: recipientId, recipientId: senderId }
      ]
    }).sort({ createdAt: 'asc' }); // Sort by createdAt in ascending order

    res.status(200).json(messages);
  } catch (error) {
    next(error);
  }
};