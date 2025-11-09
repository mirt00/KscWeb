// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import logoRoutes from "./routes/logoRoutes.js";
import contactRoutes from "./routes/contactRoutes.js"; // ✅ ES Module import

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/logo", logoRoutes);
app.use("/api/contact", contactRoutes); // frontend fetch
app.use("/api/admin/contact", contactRoutes); // admin edit/update

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
