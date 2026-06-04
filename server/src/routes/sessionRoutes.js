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
  getClientSessions,
  approveSession,
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

router.get(
  "/:id/join",
  protect,
  joinMeeting
);

module.exports =
router;