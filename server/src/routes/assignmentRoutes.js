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
} = require(
  "../controllers/assignmentController"
);

router.post(
  "/",
  protect,
  authorize("admin"),
  assignTherapist
);

module.exports =
router;