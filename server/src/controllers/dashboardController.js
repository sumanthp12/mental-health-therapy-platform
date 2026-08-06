const Assignment = require("../models/Assignment");
const Session = require("../models/Session");
const Therapist = require("../models/Therapist");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const Payment = require("../models/Payment"); 

const getTherapistDashboard = async (req, res) => {
  try {
    const therapistProfile = await Therapist.findOne({
        user: req.user.id,
        });

        if (!therapistProfile) {
        return res.status(404).json({
            message: "Therapist profile not found",
        });
        }

        const therapistId = therapistProfile._id;
        const assignments = await Assignment.find({
        therapist: therapistId,
        status: "active",
        })
        .populate("client")
        .sort({ assignedAt: -1 });


        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);


        const todaySessions = await Session.find({
        therapist: therapistId,
        sessionDate: {
            $gte: today,
            $lt: tomorrow,
        },
        })
        .populate("client")
        .sort({ sessionDate: 1 });


        const upcomingSessions = await Session.find({
        therapist: therapistId,
        sessionDate: {
            $gt: new Date(),
        },
        })
        .populate("client")
        .sort({ sessionDate: 1 })
        .limit(5);

        res.json({
        assignedClients: assignments.length,
        todaySessions: todaySessions.length,
        recentClients: assignments.slice(0, 5),
        upcomingSessions,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
        message: "Failed to load dashboard",
        });
    }
    };

const getClientDashboard = async (req, res) => {
  try {
    const clientId = req.user.id;

    // Find client's assignment
    const assignment = await Assignment.findOne({
      client: clientId,
    }).populate({
      path: "therapist",
      populate: {
        path: "user",
        select: "name email",
      },
    });

    // Upcoming sessions
    const upcomingSessions = await Session.find({
      client: clientId,
      status: { $in: ["scheduled", "approved"] },
    }).sort({ sessionDate: 1 });

    // Next session
    const nextSession =
      upcomingSessions.length > 0 ? upcomingSessions[0] : null;

    // Recent messages
    const conversations = await Conversation.find({
      participants: clientId,
    });

    const conversationIds = conversations.map((c) => c._id);

    const recentMessages = await Message.find({
      conversation: { $in: conversationIds },
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      assignedTherapist: assignment
        ? assignment.therapist
        : null,
      upcomingSessions,
      nextSession,
      recentMessages,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to load dashboard",
    });
  }
};

const getAdminDashboard = async (req, res) => {
  try {

    // Fetch all dashboard statistics in parallel
    const [
      totalClients,
      totalTherapists,
      totalSessions,
      revenueResult,
      upcomingSessions,
    ] = await Promise.all([

      User.countDocuments({
        role: "client",
      }),

      Therapist.countDocuments(),

      Session.countDocuments(),

      Payment.aggregate([
        {
          $match: {
            status: "paid",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$amount",
            },
          },
        },
      ]),

      Session.find({
        sessionDate: {
          $gte: new Date(),
        },
        status: {
          $in: ["approved", "scheduled"],
        },
      })
        .populate("client", "name")
        .populate({
          path: "therapist",
          populate: {
            path: "user",
            select: "name",
          },
        })
        .sort({ sessionDate: 1 })
        .limit(5),
    ]);

    const revenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    res.status(200).json({
      success: true,

      stats: {
        clients: totalClients,
        therapists: totalTherapists,
        sessions: totalSessions,
        revenue,
      },
      upcomingSessions: upcomingSessions.map((session) => ({
        id: session._id,
        client: session.client?.name || "Unknown Client",
        therapist:
          session.therapist?.user?.name || "Unknown Therapist",
        date: session.sessionDate,
        time: session.sessionTime,
        status: session.status,
      })),
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to load admin dashboard.",
    });

  }
};

module.exports = {
  getTherapistDashboard,
  getClientDashboard,
  getAdminDashboard,
};
