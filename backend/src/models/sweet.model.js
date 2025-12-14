import mongoose from "mongoose";

const sweetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    // ✅ REQUIRED FOR UI
    image: {
      type: String,
      required: true, // image URL
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sweet", sweetSchema);
