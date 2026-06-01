const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createTherapist,
} = require(
  "../controllers/therapistController"
);

router.post(
  "/",
  protect,
  authorize("admin"),
  createTherapist
);

module.exports = router;