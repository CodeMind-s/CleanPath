import express from "express";

import {
  createTransaction,
  getAllTransactions,
  getTransactionsByUser,
  getTransactionById,
  updateTransaction,
} from "../controllers/transactionController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authenticate, createTransaction)
  .get(authenticate, authorizeAdmin, getAllTransactions);

router.route("/user").get(authenticate, getTransactionsByUser);

router
  .route("/:id")
  .get(authenticate, getTransactionById)
  .put(authenticate, updateTransaction);

export default router;
