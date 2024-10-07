import mongoose from "mongoose";

const smartDeviceSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gType: {
      type: String,
      required: true,
      enum: ["recyclable", "non-recyclable"], // Enumerated values
    },
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const SmartDevice = mongoose.model("SmartDevice", smartDeviceSchema);

export default SmartDevice;
