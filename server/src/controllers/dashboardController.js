const Assignment = require("../models/Assignment");
const Session = require("../models/Session");
const Therapist = require("../models/Therapist");

exports.getTherapistDashboard = async (req, res) => {
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
