const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {
  createConversation,
  sendMessage,
  getConversations,
  getMessages,
    markMessagesAsRead,
    getUnreadCount,
} = require(
  "../controllers/chatController"
);

router.post(
  "/conversation",
  protect,
  createConversation
);

router.post(
  "/message",
  protect,
  sendMessage
);

router.get(
  "/conversations",
  protect,
  getConversations
);

router.get(
  "/messages/:conversationId",
  protect,
  getMessages
);

router.patch(
  "/read/:conversationId",
  protect,
  markMessagesAsRead
);

router.get(
  "/unread-count",
  protect,
  getUnreadCount
);

module.exports =
router;