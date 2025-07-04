import mongoose from "mongoose";

export const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },

    status: { type: String, enum: ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"], default: "Order Placed" },

    paymentMethod: { type: String, required: true },

    isPaid: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
