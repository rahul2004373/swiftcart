import express from "express";
import Product from "../models/Product.js";
import upload from "../config/multer.js";
import cloudinary from "../config/cloudinary.js";
// import isAdmin from "../middlewares/isAdmin.js";
// import { clerkAuthMiddleware } from "../middlewares/authMiddleware.js";
import { clerkClient, requireAuth, getAuth } from "@clerk/express";
import { use } from "react";

const router = express.Router();

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    // console.log("products", products);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

//upload route - TO Cloudinary
router.post("/products/upload", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // Upload image to Cloudinary from memory buffer
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "Ecommerce-Website" },

        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      imageUrl: uploadResult.secure_url,
    });

    await newProduct.save();

    res.status(201).json({ message: "Product uploaded", product: newProduct });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: err.message || "Upload failed" });
  }
});

// product search route
router.get("/products/search", async (req, res) => {
  const searchQuery = req.query.q || "";
  console.log("Search Query", searchQuery);

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } },
        { description: { $regex: searchQuery, $options: "i" } },
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private (e.g., Admin) - For simplicity, public for now
router.put("products/:id", requireAuth(), async (req, res) => {
  try {
    const { name, description, price, countInStock, imageUrl, category } =
      req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
      product.imageUrl = imageUrl || product.imageUrl;
      product.category = category || product.category;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private (e.g., Admin) - For simplicity, public for now
router.delete("products/:id", requireAuth(), async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params._id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
