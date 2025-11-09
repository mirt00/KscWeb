// routes/adminRoutes.js
import express from "express";
import {
  registerAdmin,
  loginAdmin,
  forgotPassword,
  resetPassword,
  getAdminProfile
} from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Existing routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.get("/profile", protectAdmin, getAdminProfile);

// ✅ Dashboard route
router.get("/dashboard", protectAdmin, (req, res) => {
  res.status(200).json({
    message: "Welcome to the admin dashboard",
    admin: {
      id: req.admin._id,
      username: req.admin.username,
      email: req.admin.email,
    },
  });
});

export default router;
