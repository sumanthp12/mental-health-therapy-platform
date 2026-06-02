const Conversation =
require("../models/Conversation");

const Message =
require("../models/Message");

const createConversation =
async (req, res) => {

  try {

    const {
      participantId,
    } = req.body;

    const conversation =
      await Conversation.create({
        participants: [
          req.user.id,
          participantId,
        ],
      });

    res.status(201).json({
      message:
        "Conversation Created",
      conversation,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const sendMessage =
async (req, res) => {

  try {

    const {
      conversationId,
      message,
    } = req.body;

    const newMessage =
      await Message.create({
        conversation:
          conversationId,
        sender:
          req.user.id,
        message,
      });

    res.status(201).json({
      message:
        "Message Sent",
      newMessage,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

module.exports = {
  createConversation,
  sendMessage,
};