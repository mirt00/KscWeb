import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// ===============================
// 🔐 Middleware: Protect Admin Routes
// ===============================
export const protectAdmin = async (req, res, next) => {
  try {
    let token;

    // ✅ Check for Bearer Token
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify JWT Token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Find admin and exclude password
      const admin = await Admin.findById(decoded.id).select("-password");

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      req.admin = admin;
      return next(); // Continue to controller
    }

    return res.status(401).json({ message: "Not authorized, token missing" });
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Not authorized, invalid token" });
  }
};
