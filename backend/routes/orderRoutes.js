import { Router } from "express";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const { customer, items } = req.body;

    if (!customer?.name || !customer?.email || !customer?.address || !customer?.city) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const orderItems = [];
    let total = 0;

    for (const item of items) {
      const product = await Product.findOne({ id: String(item.id) });
      const qty = Number(item.quantity);
      if (!product || !Number.isInteger(qty) || qty < 1) {
        return res.status(400).json({ message: "Invalid item in cart" });
      }
      if (product.stock < qty) {
        return res.status(400).json({ message: `${product.name} is out of stock` });
      }
      orderItems.push({ productId: product.id, name: product.name, price: product.price, quantity: qty });
      total += product.price * qty;
    }

    const order = await Order.create({ customer, items: orderItems, total });

    for (const i of orderItems) {
      await Product.updateOne({ id: i.productId }, { $inc: { stock: -i.quantity } });
    }

    res.status(201).json({ message: "Order placed", orderId: order._id, total });
  } catch (err) {
    next(err);
  }
});

export default router;