import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// ================= ROUTES =================
import adminRoutes from "./routes/adminRoutes.js";
import logoRoutes from "./routes/logoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import placementRoutes from "./routes/placementRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js"

dotenv.config();
connectDB();

const app = express();

// ================= MIDDLEWARE =================
// Enable CORS for frontend
app.use(cors({ origin: "http://localhost:5173" }));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static("uploads"));

// Trim trailing spaces in URLs
app.use((req, res, next) => {
  req.url = req.url.trim();
  next();
});

// ================= API ROUTES =================
// Admin routes
app.use("/api/admin", adminRoutes);
app.use("/api/admin/contact", contactRoutes);

//student admission
app.use("/api/admission", admissionRoutes)

// About page routes
app.use("/api/about", aboutRoutes);

// Public routes
app.use("/api/logo", logoRoutes);
app.use("/api/contact", contactRoutes);

// Results
app.use("/api/admin/result", resultRoutes); // Admin
app.use("/api/result", resultRoutes);       // Public

// Placements
app.use("/api/admin/placement", placementRoutes);
app.use("/api/placement", placementRoutes);

app.use("/api/notice",noticeRoutes);

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
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
