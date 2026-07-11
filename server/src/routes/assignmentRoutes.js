const express =
require("express");

const router =
express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  assignTherapist,
  getClientTherapist,
  getTherapistClients,
  getAssignmentDetails,
  getAllAssignments,
} = require(
  "../controllers/assignmentController"
);

router.post(
  "/",
  protect,
  authorize("admin"),
  assignTherapist
);

router.get(
  "/client",
  protect,
  getClientTherapist
);

router.get(
  "/therapist/:therapistId",
  protect,
  getTherapistClients
);

router.get(
  "/:assignmentId",
  protect,
  getAssignmentDetails
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllAssignments
);

module.exports =
router;