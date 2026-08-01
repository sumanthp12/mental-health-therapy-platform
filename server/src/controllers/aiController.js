const AIConversation = require("../models/AIConversation");

const { generateAIResponse } = require("../services/geminiService");

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        message: "Message is required",
      });
    }

    const userId = req.user.id;

    let conversation = await AIConversation.findOne({
      user: userId,
    });

    if (!conversation) {
      conversation = await AIConversation.create({
        user: userId,
        messages: [],
      });
    }

    // Save user message
    conversation.messages.push({
      role: "user",
      content: message,
    });

      const aiReply = await generateAIResponse(message);

    // Save AI response
    conversation.messages.push({
      role: "assistant",
      content: aiReply,
    });

    await conversation.save();

    res.json({
      reply: aiReply,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate AI response",
    });
  }
};


const getConversationHistory = async (req, res) => {
  try {
    const conversation = await AIConversation.findOne({
      user: req.user.id,
    });

    if (!conversation) {
      return res.json({
        messages: [],
      });
    }

    res.json({
      messages: conversation.messages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load history",
    });
  }
};

module.exports = {
  chatWithAI,
  getConversationHistory,
};