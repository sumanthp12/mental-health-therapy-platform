const mongoose = require("mongoose");

const paymentSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      session: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true,
      },

      amount: {
        type: Number,
        required: true,
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
          "created",
          "paid",
          "failed",
        ],
        default: "created",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Payment",
    paymentSchema
  );