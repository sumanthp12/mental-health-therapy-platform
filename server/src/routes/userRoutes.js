const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { registerUser, loginUser, getProfile, getAllUsers  } = require("../controllers/userController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.get("/", protect, getAllUsers);
module.exports = router;