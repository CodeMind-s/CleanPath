import express from "express";
import {
  createSmartDevice,
  getAllSmartDevices,
  getSmartDeviceById,
  updateSmartDevice,
  deleteSmartDevice,
  getUserSmartDevices,
} from "../controllers/smartDeviceController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes for creating a new smart device and getting all smart devices
router
  .route("/")
  .post(authenticate, createSmartDevice) // Only authenticated users can create smart devices
  .get(authenticate, authorizeAdmin, getAllSmartDevices); // Only admins can get all smart devices

// Route for getting smart devices created by the authenticated user
router.route("/my-devices").get(authenticate, getUserSmartDevices); // Only authenticated users can access their own smart devices

// Route for getting, updating, and deleting a specific smart device by ID
router
  .route("/:id")
  .get(authenticate, getSmartDeviceById) // Authenticated users can get a smart device by ID
  .put(authenticate, authorizeAdmin, updateSmartDevice) // Only admins can update a smart device
  .delete(authenticate, authorizeAdmin, deleteSmartDevice); // Only admins can delete a smart device

export default router;
