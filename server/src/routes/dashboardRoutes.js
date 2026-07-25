const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getTherapistDashboard,
} = require("../controllers/dashboardController");

router.get("/therapist", auth, getTherapistDashboard);

module.exports = router;