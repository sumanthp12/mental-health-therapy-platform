const mongoose = require("mongoose");

const intakeFormSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    concern: {
      type: String,
      required: true,
    },

    symptoms: {
      type: String,
      required: true,
    },

    preferredTherapistGender: {
      type: String,
      default: "No Preference",
    },

    preferredLanguage: {
      type: String,
      default: "English",
    },

    emergencyContact: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      default: "",
    },

    status: {
        type: String,
        enum: [
            "pending",
            "approved",
            "assigned",
            "completed",
        ],
        default: "pending",
        },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "IntakeForm",
  intakeFormSchema
);