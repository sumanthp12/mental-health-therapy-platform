const express = require("express");

const router = express.Router();

const protect =
require("../middleware/authMiddleware");

const authorize =
require("../middleware/roleMiddleware");

const {
  createTherapist,
  updateTherapist,
  deleteTherapist,
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

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateTherapist
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteTherapist
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