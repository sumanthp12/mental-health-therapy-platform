const Razorpay = require("razorpay");
const crypto = require("crypto");

const Payment = require("../models/Payment");
const Session = require("../models/Session");

const razorpay = new Razorpay({
  key_id:
    process.env.RAZORPAY_KEY_ID,

  key_secret:
    process.env.RAZORPAY_KEY_SECRET,
});

const createOrder =
  async (req, res) => {

    try {

      const {
        sessionId,
        amount,
      } = req.body;

      const order =
        await razorpay.orders.create({
          amount:
            amount * 100,
          currency:
            "INR",
          receipt:
            `receipt_${Date.now()}`,
        });

      const payment =
        await Payment.create({
          user:
            req.user.id,

          session:
            sessionId,

          amount,

          razorpayOrderId:
            order.id,
        });

      res.status(201).json({
        success: true,
        order,
        payment,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

const verifyPayment = async (
  req,
  res
) => {

  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env
            .RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id +
          "|" +
          razorpay_payment_id
        )
        .digest("hex");

    if (
      generatedSignature !==
      razorpay_signature
    ) {

      return res
        .status(400)
        .json({
          success: false,
          message:
            "Payment verification failed",
        });

    }

    const payment =
      await Payment.findOneAndUpdate(
        {
          razorpayOrderId:
            razorpay_order_id,
        },
        {
          status: "paid",
        },
        {
          new: true,
        }
      );

    if (payment) {

      await Session.findByIdAndUpdate(
        payment.session,
        {
          paymentStatus:
            "paid",
        }
      );

    }

    res.json({
      success: true,
      message:
        "Payment verified",
      payment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }

};

const getPaymentHistory =
async (
  req,
  res
) => {

  try {

    const payments =
      await Payment
        .find({
          user: req.user.id,
        })
        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      count:
        payments.length,
      payments,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }

};

const getRevenueStats =
async (
  req,
  res
) => {

  try {

    const totalPayments =
      await Payment.countDocuments();

    const paidPayments =
      await Payment.countDocuments({
        status: "paid",
      });

    const pendingPayments =
      await Payment.countDocuments({
        status: "created",
      });

    const revenueData =
      await Payment.aggregate([
        {
          $match: {
            status: "paid",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$amount",
            },
          },
        },
      ]);

    const totalRevenue =
      revenueData.length > 0
        ? revenueData[0]
            .totalRevenue
        : 0;

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalPayments,
        paidPayments,
        pendingPayments,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }

};  

const getTherapistEarnings =
async (
  req,
  res
) => {

  try {

    const therapistId =
      req.user.id;

    const sessions =
      await Session.find({
        therapist:
          therapistId,
      });

    const sessionIds =
      sessions.map(
        session => session._id
      );

    const payments =
      await Payment.find({
        session: {
          $in:
            sessionIds,
        },
      });

    const paidPayments =
      payments.filter(
        payment =>
          payment.status ===
          "paid"
      );

    const pendingPayments =
      payments.filter(
        payment =>
          payment.status !==
          "paid"
      );

    const totalEarnings =
      paidPayments.reduce(
        (
          total,
          payment
        ) =>
          total +
          payment.amount,
        0
      );

    const pendingEarnings =
      pendingPayments.reduce(
        (
          total,
          payment
        ) =>
          total +
          payment.amount,
        0
      );

    res.json({
      success: true,
      stats: {

        totalSessions:
          sessions.length,

        paidSessions:
          paidPayments.length,

        totalEarnings,

        pendingEarnings,

      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }

};

module.exports = {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getRevenueStats,
  getTherapistEarnings,
};