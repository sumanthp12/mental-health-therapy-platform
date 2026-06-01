const express = require("express");

const router = express.Router();

const protect =
  require("../middleware/authMiddleware");

const authorize =
  require("../middleware/roleMiddleware");

const {
  getAdminDashboard,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getAdminDashboard
);

module.exports = router;