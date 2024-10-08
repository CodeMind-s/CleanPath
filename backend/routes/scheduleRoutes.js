import express from "express";
import {
    createSchedule,
    getAllSchedules,
    getTruckSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule
} from "../controllers/scheduleController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(createSchedule)
  .get(getAllSchedules);
  // .post(authenticate, authorizeAdmin, createSchedule)
  // .get(authenticate, getAllSchedules);

router.route("/collector-schedules/:id").get(getTruckSchedules);

router
  .route("/:id")
  .get(getScheduleById)
  .put(updateSchedule)
  .delete(deleteSchedule);
  // .get(authenticate, getScheduleById)
  // .put(authenticate, authorizeAdmin, updateSchedule)
  // .delete(authenticate, authorizeAdmin, deleteSchedule);

export default router;