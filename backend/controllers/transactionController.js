import Transaction from "../models/transactionModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../models/userModel.js";

// @desc    Create a new transaction
// @route   POST /api/transactions
const createTransaction = asyncHandler(async (req, res) => {
  const { description, isRefund, isPaid, amount } = req.body;

  // Find the user
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }

  const transaction = new Transaction({
    user: req.user._id,
    description,
    isPaid,
    isRefund,
    amount,
  });

  try {
    const createdTransaction = await transaction.save();
    res.status(201).json(createdTransaction);
  } catch (error) {
    res.status(400);
    throw new Error("Transaction creation failed.");
  }
});

// @desc    Get all transactions
// @route   GET /api/transactions
const getAllTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({})
    .populate("user", "name email") // Populate user details
    .sort({ createdAt: -1 });

  res.status(200).json(transactions);
});

// @desc    Get a transaction by ID
// @route   GET /api/transactions/:id
const getTransactionById = asyncHandler(async (req, res) => {
  const transaction = await Transaction.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (transaction) {
    res.status(200).json(transaction);
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});

// @desc    Get all transactions by user
// @route   GET /api/transactions/user/:userId
const getTransactionsByUser = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ user: req.user._id })
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  if (transactions.length > 0) {
    res.status(200).json(transactions);
  } else {
    res.status(404).json({ message: "No transactions found for this user" });
  }
});

// @desc    Update a transaction
// @route   PUT /api/transactions/:id
const updateTransaction = asyncHandler(async (req, res) => {
  const { isPaid } = req.body;

  const transaction = await Transaction.findById(req.params.id);

  if (transaction) {
    transaction.isPaid = isPaid !== undefined ? isPaid : transaction.isPaid;

    const updatedTransaction = await transaction.save();
    res.status(200).json(updatedTransaction);
  } else {
    res.status(404).json({ message: "Transaction not found" });
  }
});

export {
  createTransaction,
  getAllTransactions,
  getTransactionsByUser,
  getTransactionById,
  updateTransaction,
};
