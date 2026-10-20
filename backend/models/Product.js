import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: String,
    category: String,
    image: String,
    stock: { type: Number, default: 10 },
  },
  { strict: false } // aapke data ke extra fields bhi save honge
);

export default mongoose.model("Product", productSchema);