import ApiHelper from "../helpers/apiHelper";

const createTransaction = async (transaction) => {
  try {
    const createdTransaction = await new ApiHelper().post(
      "transactions",
      transaction
    );
    return createdTransaction;
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getAllTransactions = async () => {
  try {
    const transactions = await new ApiHelper().get("transactions", {});
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getUserTransactions = async () => {
  try {
    const userTransactions = await new ApiHelper().get(`transactions/user`, {});
    return userTransactions;
  } catch (error) {
    console.error("Error fetching user transactions:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const getTransactionById = async (id) => {
  try {
    const transaction = await new ApiHelper().get(`transactions/${id}`, {});
    return transaction;
  } catch (error) {
    console.error("Error fetching transaction:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

const updateTransaction = async (transaction, id) => {
  try {
    const updatedTransaction = await new ApiHelper().put(
      `transactions/${id}`,
      transaction
    );
    return updatedTransaction;
  } catch (error) {
    console.error("Error updating transaction:", error.message);
    throw error; // Rethrow the error for the component to handle
  }
};

export {
  createTransaction,
  getAllTransactions,
  getUserTransactions,
  getTransactionById,
  updateTransaction,
};
