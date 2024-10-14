import mongoose from "mongoose";

/**
 * Connects to the MongoDB database using the connection string specified in the environment variable MONGO_URI.
 * Logs a success message upon successful connection.
 * Logs an error message and exits the process with a status code of 1 if the connection fails.
 *
 * @async
 * @function connectDB
 * @returns {Promise<void>} A promise that resolves when the connection is successful.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error(`ERROR: ${error.message}`);
    process.exit(1);
  }
};
export default connectDB;
