const express =
  require("express");

const router =
  express.Router();

const {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  getRevenueStats,
  getTherapistEarnings,
} = require(
  "../controllers/paymentController"
);

const protect =
  require(
    "../middleware/authMiddleware"
  );

router.post(
  "/create-order",
  protect,
  createOrder
);

router.post(
  "/verify",
  protect,
  verifyPayment
);

router.get(
  "/history",
  protect,
  getPaymentHistory
);

router.get(
  "/revenue-stats",
  protect,
  getRevenueStats
);

router.get(
  "/therapist-earnings",
  protect,
  getTherapistEarnings
);

module.exports =
  router;