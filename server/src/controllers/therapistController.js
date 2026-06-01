const Therapist =
require("../models/Therapist");

const User =
require("../models/User");

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

module.exports = {
  createTherapist,
};