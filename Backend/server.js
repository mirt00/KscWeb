import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import logoRoutes from "./routes/logoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

// ✅ Connect to MongoDB
connectDB();

const app = express();

// ✅ Middlewares
app.use(express.json()); // Parse JSON
app.use(cors({ origin: "http://localhost:5173" })); // Allow frontend origin

// ✅ Trim trailing spaces and newlines in URLs to prevent %0A errors
app.use((req, res, next) => {
  req.url = req.url.trim();
  next();
});

// ✅ Routes
app.use("/api/admin", adminRoutes);
app.use("/api/logo", logoRoutes);
app.use("/api/contact", contactRoutes);       // Frontend fetch/update
app.use("/api/admin/contact", contactRoutes); // Admin edit/update

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// ✅ 404 handler for unmatched routes
app.use((req, res, next) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Server Error", error: err.message });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
