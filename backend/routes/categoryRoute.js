import express from "express";
import Product from "../models/Product.js";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
import { Protect } from "@clerk/clerk-react";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

router.use(ClerkExpressWithAuth());

// routes for category based filtering for pages
router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products by category" });
  }
});

export default router;
