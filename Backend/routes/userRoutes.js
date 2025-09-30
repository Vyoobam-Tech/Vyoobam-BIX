const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  register,
  login,
  getUserById,
  getMe,
  updateUser,
  listUsers,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

// Static routes first
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/me",auth, getMe);
router.get("/",auth, listUsers);

// Dynamic route must go LAST
router.put("/:id",auth, updateUser);
router.get("/:id",auth, getUserById);


module.exports = router;
