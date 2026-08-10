const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { registerUser, loginUser, getProfile, getAllUsers, updateUser, updateProfile, changePassword, deleteUser } = require("../controllers/userController");


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.get("/", protect, getAllUsers);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;