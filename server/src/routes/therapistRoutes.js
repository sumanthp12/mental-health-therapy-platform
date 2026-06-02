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

module.exports = router;