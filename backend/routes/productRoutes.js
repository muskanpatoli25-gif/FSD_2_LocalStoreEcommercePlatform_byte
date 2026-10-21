import { Router } from "express";
import Product from "../models/Product.js";

const router = Router();

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// GET /api/products?category=Skincare&search=serum
router.get("/", async (req, res, next) => {
  try {
    const { category, search } = req.query;
    const filter = {};

    if (category && category !== "All") {
      filter.category = category;
    }

    const term = typeof search === "string" ? search.trim() : "";
    if (term) {
      const regex = new RegExp(escapeRegex(term), "i");
      filter.$or = [{ name: regex }, { category: regex }, { description: regex }];
    }

    const products = await Product.find(filter).sort({ createdAt: 1, _id: 1 });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

export default router;