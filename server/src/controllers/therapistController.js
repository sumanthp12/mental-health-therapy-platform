const Therapist =
require("../models/Therapist");

const User =
require("../models/User");

const Assignment =
require("../models/Assignment");
const bcrypt = require("bcryptjs");

const createTherapist = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      specialization,
      experience,
      bio,
      availability,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !specialization
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "therapist",
    });

    const therapist =
      await Therapist.create({
        user: user._id,
        specialization,
        experience,
        bio,
        availability,
      });

    const populatedTherapist =
      await Therapist.findById(
        therapist._id
      ).populate(
        "user",
        "name email role"
      );

    return res.status(201).json({
      success: true,
      therapist: populatedTherapist,
      message:
        "Therapist created successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const updateTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found",
      });
    }

    const user = await User.findById(therapist.user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const {
      name,
      email,
      password,
      specialization,
      experience,
      bio,
      availability,
    } = req.body;

    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }

      user.email = email;
    }

    if (name) user.name = name;

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    therapist.specialization = specialization;
    therapist.experience = experience;
    therapist.bio = bio;
    therapist.availability = availability;

    await therapist.save();

    const updatedTherapist = await Therapist.findById(
      therapist._id
    ).populate("user", "name email role");

    res.json({
      success: true,
      therapist: updatedTherapist,
      message: "Therapist updated successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteTherapist = async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id);

    if (!therapist) {
      return res.status(404).json({
        success: false,
        message: "Therapist not found",
      });
    }

    await User.findByIdAndDelete(therapist.user);

    await Therapist.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Therapist deleted successfully",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
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
  updateTherapist,
  deleteTherapist,
  getAllTherapists,
  getMyClients,
  getAssignedTherapist,
};