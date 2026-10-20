import dotenv from "dotenv";
import mongoose from "mongoose";
import products from "../frontend/src/data/products.js";
import Product from "./models/Product.js";

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URI);
  await Product.deleteMany({});
  await Product.insertMany(
    products.map((p) => ({ ...p, id: String(p.id), stock: p.stock ?? 10 }))
  );
  console.log(`Seeded ${products.length} products`);
} catch (err) {
  console.error("Seed failed:", err.message);
} finally {
  await mongoose.disconnect();
  process.exit(0);
}