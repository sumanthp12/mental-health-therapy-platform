const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createTherapist,
  getAllTherapists,
  getMyClients,
  getAssignedTherapist,
} = require(
  "../controllers/therapistController"
);

router.get(
  "/",
  protect,
  authorize("admin"),
  getAllTherapists
);

router.post(
  "/",
  protect,
  authorize("admin"),
  createTherapist
);

router.get(
  "/my-clients",
  protect,
  authorize("therapist"),
  getMyClients
);

router.get(
  "/assigned",
  protect,
  authorize("client"),
  getAssignedTherapist
);

module.exports = router;