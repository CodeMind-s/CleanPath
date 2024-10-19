import express from "express";
import {
  createCollector,
  getAllCollectors,
  getCollectorsByWMA,
  updateCollector,
  deleteCollector,
  getCollectorById,
  loginCollector,
  getCurrentCollectorProfile,
  logoutCurrentCollector,
} from "../controllers/collectorController.js";
import {
  authenticate,
  authorizeAdmin,
  authenticateWMA,
  authenticateCollector,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new collector
router.route("/").post(authenticateWMA, createCollector).get(getAllCollectors);
// .post(getCollectorsByWMA)
// .post(authenticate, authorizeAdmin, createCollector)
// .get(authenticate, authorizeAdmin, getAllCollectors);

router.post("/logout", authenticateCollector, logoutCurrentCollector);

router.post("/auth", loginCollector);
router.route("/wma-collectors/:id").get(getCollectorsByWMA);

router.route("/profile").get(authenticateCollector, getCurrentCollectorProfile);

// Route to update and delete a truck
router
  .route("/:id")
  .get(getCollectorById)
  .put(updateCollector)
  .delete(deleteCollector);
// .put(authenticate, authorizeAdmin, updateCollector)
// .delete(authenticate, authorizeAdmin, deleteCollector);

export default router;
