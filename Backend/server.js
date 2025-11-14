import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import adminRoutes from "./routes/adminRoutes.js";
import logoRoutes from "./routes/logoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ================= MIDDLEWARE =================
// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:5173" }));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files (if needed)
app.use("/uploads", express.static("uploads"));

// Trim trailing spaces/newlines from URLs
app.use((req, res, next) => {
  req.url = req.url.trim();
  next();
});

// ================= API ROUTES =================
app.use("/api/admin", adminRoutes);
app.use("/api/logo", logoRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/contact", contactRoutes); // Admin-specific
app.use("/api/v1/notice", noticeRoutes);        // Notices CRUD

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running 🚀" });
});

// ================= 404 HANDLER =================
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ================= GLOBAL ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: err.message,
  });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
