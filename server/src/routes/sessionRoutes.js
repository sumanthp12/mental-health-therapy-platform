const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  bookSession,
  getTherapistSessions,
  approveSession,
} = require(
  "../controllers/sessionController"
);

router.post(
  "/",
  protect,
  authorize("client"),
  bookSession
);

router.get(
  "/therapist",
  protect,
  authorize("therapist"),
  getTherapistSessions
);

router.patch(
  "/:id/approve",
  protect,
  authorize("therapist"),
  approveSession
);

module.exports =
router;