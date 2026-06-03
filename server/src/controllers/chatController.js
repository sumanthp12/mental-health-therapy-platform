const Conversation =
require("../models/Conversation");

const Message =
require("../models/Message");

const {
  createNotification,
} = require(
  "../services/notificationService"
);

const {
  getIO,
  getOnlineUsers,
} = require(
  "../socket/chatSocket"
);

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

    const conversation =
      await Conversation.findById(
        conversationId
      );

    const receiverId =
      conversation.participants.find(
        (participant) =>
          participant.toString() !==
          req.user.id
      );

    await createNotification({

      recipient: receiverId,

      title: "New Message",

      message:
        "You received a new message.",

      type: "message",

    });

    const io = getIO();

    const onlineUsers =
      getOnlineUsers();

    const receiverSocketId =
      onlineUsers.get(
        receiverId.toString()
      );

    if (receiverSocketId) {

      io.to(
        receiverSocketId
      ).emit(
        "new-notification",
        {

          title:
            "New Message",

          message:
            "You received a new message.",

          type:
            "message",

        }
      );

    }

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

const markMessagesAsRead =
    async (req, res) => {

    try {

        await Message.updateMany(
        {
            conversation:
            req.params.conversationId,

            read: false,
        },
        {
            read: true,
        }
        );

        res.status(200).json({
        message:
            "Messages Marked Read",
        });

    } catch (error) {

        res.status(500).json({
        message:
            error.message,
        });

    }

    };

const getUnreadCount =
async (req, res) => {

  try {

    const count =
      await Message.countDocuments(
        {
          read: false,
        }
      );

    res.status(200).json({
      count,
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
  getConversations,
  getMessages,
  markMessagesAsRead,
  getUnreadCount,
};