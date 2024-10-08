// Packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

import collectorRoutes from "./routes/collectorRoutes.js"
import wmaRoutes from "./routes/wmaRoutes.js";
import garbageRoutes from "./routes/garbageRoutes.js"; // fixed typo in garbageRoutes
import scheduleRoutes from "./routes/scheduleRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import areaRoutes from "./routes/areaRoutes.js"; // Import areaRoutes
import smartDeviceRoutes from "./routes/smartDeviceRoutes.js"; // Import smartDeviceRoutes

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

// Enable CORS

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // Allow credentials (cookies) to be included
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Conn Testing
app.get("/api", (req, res) => {
  res.send("Connected to CleanPath API");
});

// Users Route
app.use("/api/users", userRoutes);

// WMA Route
app.use("/api/wmas", wmaRoutes);

// Garbage Route
app.use("/api/garbage", garbageRoutes);

// Collector Route
app.use("/api/collector", collectorRoutes);

// Schedule Route
app.use("/api/schedule", scheduleRoutes);

// Transaction Route
app.use("/api/transactions", transactionRoutes);

// Area Route
app.use("/api/areas", areaRoutes);

// smarDevice Route
app.use("/api/smartDevices", smartDeviceRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));

export default app;
