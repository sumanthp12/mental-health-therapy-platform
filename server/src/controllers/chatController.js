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

    const existingConversation =
        await Conversation.findOne({
            participants: {
            $all: [
                req.user.id,
                participantId,
            ],
            },
        });

        if (existingConversation) {
        return res.status(200).json({
            message:
            "Conversation Already Exists",
            conversation:
            existingConversation,
        });
        }

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

const getConversations =
async (req, res) => {

  try {

    const conversations =
      await Conversation.find({
        participants: req.user.id,
      })
      .populate(
        "participants",
        "name email role"
      );

    res.status(200).json(
      conversations
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getMessages =
async (req, res) => {

  try {

    const messages =
      await Message.find({
        conversation:
          req.params.conversationId,
      })
      .populate(
        "sender",
        "name role"
      )
      .sort({
        createdAt: 1,
      });

    res.status(200).json(
      messages
    );

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
  getConversations,
  getMessages,
};