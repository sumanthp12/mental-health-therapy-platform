const mongoose = require("mongoose");

const assignmentSchema =
  new mongoose.Schema(
    {
      client: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      therapist: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Therapist",
        required: true,
      },

      intakeForm: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "IntakeForm",
        required: true,
      },

      status: {
        type: String,
        enum: [
          "active",
          "completed",
          "cancelled",
        ],
        default: "active",
      },

      assignedAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Assignment",
    assignmentSchema
  );