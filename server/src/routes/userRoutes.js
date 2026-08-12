const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { registerUser, loginUser, getProfile, getAllUsers, updateUser, updateProfile, changePassword, deleteUser } = require("../controllers/userController");
const validate = require("../middleware/validateMiddleware");

const {
  registerSchema,
  loginSchema,
  profileUpdateSchema,
  changePasswordSchema,
  updateUserSchema,
} = require("../validators/userValidator");

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, validate(profileUpdateSchema), updateProfile);
router.put("/change-password", protect, validate(changePasswordSchema), changePassword);
router.get("/", protect, getAllUsers);
router.put("/:id", protect, validate(updateUserSchema), updateUser);
router.delete("/:id", protect, deleteUser);

module.exports = router;