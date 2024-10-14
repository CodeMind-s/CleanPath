import express from "express";
import {
  createGarbageRequest,
  getAllGarbageRequests,
  getUserGarbageRequests,
  getGarbageRequestById,
  updateGarbageRequest,
  deleteGarbageRequest,
} from "../controllers/garbageController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new garbage request and get all garbage requests
router
  .route("/")
  .post(authenticate, createGarbageRequest)
  .get(getAllGarbageRequests);

// Route to get garbage requests for a specific user
router.route("/garbage-requests").get(authenticate, getUserGarbageRequests);

// Routes to get, update, and delete a garbage request by ID
router
  .route("/:id")
  .get(authenticate, getGarbageRequestById)
  .put(authenticate, authorizeAdmin, updateGarbageRequest)
  .delete(authenticate, deleteGarbageRequest);

export default router;
