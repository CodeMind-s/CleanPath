// Packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

// Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import garbageRoutes from "./routes/garbageRoutes.js";
import collectorRoutes from "./routes/collectorRoutes.js"
import scheduleRoutes from "./routes/scheduleRoutes.js";

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

// Garbage Route
app.use("/api/garbage", garbageRoutes);

// Collector Route
app.use("/api/collector", collectorRoutes);

// Schedule Route
app.use("/api/schedule", scheduleRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
