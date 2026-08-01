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
  scheduleSession,
  getTherapistSessions,
  getClientSessions,
  approveSession,
  startMeeting,
  completeSession,
  joinMeeting,
} = require(
  "../controllers/sessionController"
);

router.post(
  "/",
  protect,
  authorize("client"),
  bookSession
);

router.post(
  "/schedule",
  protect,
  authorize("therapist"),
  scheduleSession
);

router.get(
  "/",
  protect,
  authorize("client"),
  getClientSessions
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

router.patch(
  "/:id/start",
  protect,
  authorize("therapist"),
  startMeeting
);

router.patch(
  "/:id/complete",
  protect,
  authorize("therapist"),
  completeSession
);

router.get(
  "/:id/join",
  protect,
  joinMeeting
);

module.exports =
router;