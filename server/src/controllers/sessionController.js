const Session = require("../models/Session");
const User = require("../models/User");
const Therapist = require("../models/Therapist");

const { createNotification,} = require("../services/notificationService");

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

const scheduleSession = async (req, res) => {
  try {
    const therapistId = req.user.id;
    const { clientId, sessionDate, sessionTime } = req.body;


    if (!clientId || !sessionDate || !sessionTime) {
      return res.status(400).json({
        message: "Client, session date and session time are required.",
      });
    }


    const therapist = await Therapist.findOne({ user: therapistId });

    if (!therapist) {
      return res.status(404).json({
        message: "Therapist profile not found.",
      });
    }


    const client = await User.findOne({
      _id: clientId,
      role: "client",
    });

    if (!client) {
      return res.status(404).json({
        message: "Client not found.",
      });
    }


    const session = await Session.create({
      therapist: therapist._id,
      client: client._id,
      sessionDate,
      sessionTime,
      status: "approved",
      meetingRoom: `mental-health-${Date.now()}`,
    });


    await createNotification({
      recipient: client._id,
      title: "New Therapy Session Scheduled",
      message: `Dr. ${req.user.name} has scheduled your therapy session on ${sessionDate} at ${sessionTime}.`,
      type: "session",
    });

    res.status(201).json({
      message: "Session scheduled successfully.",
      session,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getTherapistSessions =
async (req, res) => {

  try {

    const therapist = await Therapist.findOne({
      user: req.user.id,
    });

    if (!therapist) {
      return res.status(404).json({
        message: "Therapist not found",
      });
    }

    const sessions = await Session.find({
      therapist: therapist._id,
    })
      .populate(
        "client",
        "name email role isOnline lastSeen"
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

const startMeeting = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    if (session.status !== "approved") {
      return res.status(400).json({
        message:
          "Only approved sessions can be started.",
      });
    }

    session.status = "live";
    session.meetingStartedAt = new Date();

    await session.save();

    res.status(200).json({
      message: "Meeting started successfully.",
      session,
    });

    await createNotification({
      recipient: session.client,
      title: "Therapy Session Started",
      message:
        "Your therapist has started the therapy session. You can now join the meeting.",
      type: "session",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const completeSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    session.status = "completed";
    session.meetingEndedAt = new Date();

    await session.save();

    res.status(200).json({
      message: "Session completed",
      session,
    });

    await createNotification({
      recipient: session.client,
      title: "Session Completed",
      message: "Your therapy session has been completed.",
      type: "session",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
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
  scheduleSession,
  getTherapistSessions,
  getClientSessions,
  approveSession,
  startMeeting,
  completeSession,
  joinMeeting,
};