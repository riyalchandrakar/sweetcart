import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        sweet: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sweet",
          required: true,
        },
        qty: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      default: "placed",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
