const Therapist =
require("../models/Therapist");

const User =
require("../models/User");

const Assignment =
require("../models/Assignment");


const createTherapist = async (
  req,
  res
) => {

  try {

    const {
      userId,
      specialization,
      experience,
      bio,
    } = req.body;

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.role !== "therapist") {
      return res.status(400).json({
        message:
          "User is not a therapist",
      });
    }

    const therapist =
      await Therapist.create({
        user: userId,
        specialization,
        experience,
        bio,
      });

    res.status(201).json({
      message:
        "Therapist Created Successfully",
      therapist,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getAllTherapists = async (
  req,
  res
) => {

  try {

    const therapists =
      await Therapist.find()
      .populate(
        "user",
        "name email role"
      );

    res.status(200).json(
      therapists
    );

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

const getMyClients = async (
  req,
  res
) => {

  try {

    const therapist =
      await Therapist.findOne({
        user: req.user.id,
      });

    if (!therapist) {
      return res.status(404).json({
        message:
          "Therapist Profile Not Found",
      });
    }

    const assignments =
      await Assignment.find({
        therapist:
          therapist._id,
      })
      .populate(
        "client",
        "name email"
      )
      .populate(
        "intakeForm"
      );

    res.status(200).json(
      assignments
    );

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

const getAssignedTherapist = async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      client: req.user.id,
    }).populate({
      path: "therapist",
      populate: {
        path: "user",
        select: "name email",
      },
    });

    if (!assignment) {
      return res.status(404).json({
        message: "No therapist assigned.",
      });
    }

    res.json(assignment.therapist);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch therapist details.",
    });
  }
};

module.exports = {
  createTherapist,
  getAllTherapists,
  getMyClients,
  getAssignedTherapist,
};