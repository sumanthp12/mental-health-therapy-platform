const User = require("../models/User");
const Therapist = require("../models/Therapist");
const Session = require("../models/Session");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

const getAdminDashboard = async (req, res) => {

  res.status(200).json({
    message: "Welcome Admin Dashboard",
    user: req.user,
  });

};

const getDashboardStats = async (req, res) => {
  try {

    const totalUsers =
      await User.countDocuments();

    const totalTherapists =
      await Therapist.countDocuments();

    const totalSessions =
      await Session.countDocuments();

    const completedSessions =
      await Session.countDocuments({
        status: "completed",
      });

    const pendingSessions =
      await Session.countDocuments({
        status: "pending",
      });

    const totalConversations =
      await Conversation.countDocuments();

    const totalMessages =
      await Message.countDocuments();

    res.status(200).json({
      totalUsers,
      totalTherapists,
      totalSessions,
      completedSessions,
      pendingSessions,
      totalConversations,
      totalMessages,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  getAdminDashboard,
  getDashboardStats,
};