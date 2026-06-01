const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createTherapist,
  getAllTherapists,
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

module.exports = router;