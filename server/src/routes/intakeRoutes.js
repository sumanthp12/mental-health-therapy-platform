const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  submitIntakeForm,
  getAllIntakeForms,
  reviewIntakeForm,
} = require(
  "../controllers/intakeController"
);

router.post(
  "/",
  protect,
  authorize("client"),
  submitIntakeForm
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllIntakeForms
);

router.patch(
  "/:id/review",
  protect,
  authorize("admin"),
  reviewIntakeForm
);

module.exports = router;