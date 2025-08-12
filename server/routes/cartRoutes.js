import express from "express";
import User from "../models/User.js";
import Product from "../models/Product.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to get logged-in user
const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ POST /api/cart — Save cart to user
router.post("/", protect, async (req, res) => {
  const { cartItems } = req.body;
  try {
    const user = await User.findById(req.user.id);
    user.cart = cartItems.map((item) => ({
      product: item._id,
      quantity: item.quantity,
    }));
    await user.save();
    res.json({ message: "Cart saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving cart" });
  }
});

// ✅ GET /api/cart — Get saved cart
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.product");
    const cartItems = user.cart.map((item) => ({
      _id: item.product._id,
      name: item.product.name,
      price: item.product.price,
      images: item.product.images,
      quantity: item.quantity,
    }));
    res.json(cartItems);
  } catch {
    res.status(500).json({ message: "Error fetching cart" });
  }
});

export default router;
