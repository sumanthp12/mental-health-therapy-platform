const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const {
  createConversation,
  sendMessage,
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

module.exports =
router;