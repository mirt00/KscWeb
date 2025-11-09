// controllers/adminController.js
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// ===============================
// 🔑 Helper: Generate JWT
// ===============================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// ===============================
// 🧍‍♂️ Register Admin
// ===============================
export const registerAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin)
      return res.status(400).json({ message: "Admin already exists" });

    const admin = await Admin.create({ username, email, password });

    res.status(201).json({
      message: "Admin registered successfully",
      token: generateToken(admin._id),
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    console.error("Register Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔐 Login Admin
// ===============================
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username and password are required" });

    const admin = await Admin.findOne({ username }).select("+password");
    if (!admin)
      return res.status(400).json({ message: "Invalid username or password" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid username or password" });

    res.status(200).json({
      message: "Login successful",
      token: generateToken(admin._id),
      admin: { id: admin._id, username: admin.username, email: admin.email },
    });
  } catch (error) {
    console.error("Login Admin Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// ✉️ Forgot Password
// ===============================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const resetToken = admin.getResetPasswordToken();
    await admin.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    res.status(200).json({
      message: `Password reset link sent to ${admin.email}`,
      resetUrl, // for testing in Postman
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🔁 Reset Password
// ===============================
export const resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const admin = await Admin.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin)
      return res.status(400).json({ message: "Invalid or expired token" });

    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;

    await admin.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// 🧾 Get Admin Profile (Protected)
// ===============================
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json(admin);
  } catch (error) {
    console.error("Get Admin Profile Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
