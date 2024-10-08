import express from "express";
import {createCollector, getAllCollectors, getCollectorsByWMA, updateCollector, deleteCollector, getCollectorById} from "../controllers/collectorController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new truck
router
  .route("/")
  .post(createCollector)
  .get(getAllCollectors);
  // .post(getCollectorsByWMA)
  // .post(authenticate, authorizeAdmin, createCollector)
  // .get(authenticate, authorizeAdmin, getAllCollectors);

router.route("/wma-collectors/:id").get(getCollectorsByWMA);

// Route to update and delete a truck
router
  .route("/:id")
  .get(getCollectorById)
  .put(updateCollector)
  .delete(deleteCollector);
  // .put(authenticate, authorizeAdmin, updateCollector)
  // .delete(authenticate, authorizeAdmin, deleteCollector);

export default router;
