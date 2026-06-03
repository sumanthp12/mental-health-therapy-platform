const mongoose = require("mongoose");

const sessionSchema =
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

      sessionDate: {
        type: Date,
        required: true,
      },

      sessionTime: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "approved",
          "completed",
          "cancelled",
        ],
        default: "pending",
      },

      notes: {
        type: String,
        default: "",
      },

      meetingRoom: {
        type: String,
        default: null,
      },

      paymentStatus: {
        type: String,
        enum: [
          "pending",
          "paid",
        ],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Session",
    sessionSchema
  );