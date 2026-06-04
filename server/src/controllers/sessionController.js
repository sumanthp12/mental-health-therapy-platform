const Session =
require("../models/Session");

const Assignment =
require("../models/Assignment");

const Therapist =
require("../models/Therapist");

const {
  createNotification,
} = require(
  "../services/notificationService"
);

const bookSession = async (
  req,
  res
) => {

  try {

    const {
      therapistId,
      sessionDate,
      sessionTime,
    } = req.body;

    const therapist =
      await Therapist.findById(
        therapistId
      );

    if (!therapist) {
      return res.status(404).json({
        message:
          "Therapist Not Found",
      });
    }

    const session =
      await Session.create({
        client:
          req.user.id,
        therapist:
          therapistId,
        sessionDate,
        sessionTime,
      });

    res.status(201).json({
      message:
        "Session Requested Successfully",
      session,
    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getTherapistSessions =
async (req, res) => {

  try {

    const therapist =
      await Therapist.findOne({
        user: req.user.id,
      });

    const sessions =
      await Session.find({
        therapist:
          therapist._id,
      })
      .populate(
        "client",
        "name email"
      );

    res.status(200).json(
      sessions
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getClientSessions =
async (req, res) => {

  try {

    const sessions =
      await Session.find({
        client: req.user.id,
      })
      .populate(
        "therapist",
        "fullName specialization"
      );

    res.status(200).json(
      sessions
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const approveSession =
async (req, res) => {

  try {

    const session =
      await Session.findById(
        req.params.id
      );

    if (!session) {
      return res.status(404).json({
        message:
          "Session Not Found",
      });
    }

    session.status =
      "approved";

    session.meetingRoom =
      `mental-health-${session._id}`;

    await session.save();

    res.status(200).json({
      message:
        "Session Approved",
      session,
    });

    await createNotification({

      recipient:
        session.client,

      title:
        "Session Scheduled",

      message:
        "Your therapy session has been scheduled.",

      type:
        "session",

    });

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const joinMeeting =
async (req, res) => {

  try {

    const session =
      await Session.findById(
        req.params.id
      );

    if (!session) {

      return res.status(404).json({
        message:
          "Session not found",
      });

    }

    res.status(200).json({

      meetingUrl:
        `https://meet.jit.si/${session.meetingRoom}`,

    });

  }

  catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

module.exports = {
  bookSession,
  getTherapistSessions,
  getClientSessions,
  approveSession,
  joinMeeting,
};