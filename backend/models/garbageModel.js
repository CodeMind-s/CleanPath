import mongoose from "mongoose";

const garbageSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference to the User who made the request
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Recyclable", "Non-Recyclable"],
    },
    area: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Collected", "In Progress"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Garbage = mongoose.model("Garbage", garbageSchema);

export default Garbage;
