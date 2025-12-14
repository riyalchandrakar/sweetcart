import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import sweetRoutes from "./routes/sweet.routes.js";
import orderRoutes from "./routes/order.routes.js";

dotenv.config();

// 🔌 Connect Database
connectDB();

const app = express();

// 🌍 Middleware
app.use(
  cors({
    origin: "*", // deploy ke baad specific origin use karna
    credentials: true,
  })
);
app.use(express.json());

// 🧪 Health check
app.get("/", (req, res) => {
  res.send("Sweet Shop API is running 🍬");
});

// 🔐 Routes
app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use("/api/orders", orderRoutes);

// ❌ 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// 🚀 Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
