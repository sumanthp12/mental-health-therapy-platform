const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  chatWithAI,
  getConversationHistory,
} = require("../controllers/aiController");

router.get("/history", protect, getConversationHistory);

router.post("/chat", protect, chatWithAI);

module.exports = router;