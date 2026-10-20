import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: String,
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    items: [
      {
        productId: String,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);