const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getTherapistDashboard,
  getClientDashboard,
  getAdminDashboard,
} = require("../controllers/dashboardController");

router.get("/therapist", auth, getTherapistDashboard);
router.get("/client", auth, getClientDashboard);
router.get("/admin", auth, getAdminDashboard);

module.exports = router;