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

module.exports =
router;