const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    // NEW
    description: {
      type: String,
      default: "Therapy Session",
    },

    // NEW
    dueDate: {
      type: Date,
    },

    // NEW
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },

    status: {
      type: String,
      enum: [
        "requested",
        "created",
        "paid",
        "failed",
        "cancelled",
      ],
      default: "requested",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Payment",
  paymentSchema
);