import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";
const router = express.Router();

// ---------- Auth middleware ----------
const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

// ---------- POST /api/orders ----------
router.post("/", protect, async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, totalPrice } = req.body;
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: "No order items" });
  }

  try {
    const order = await Order.create({
      user: req.user.id,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });
    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------- GET /api/orders/my ----------
router.get("/my", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort("-createdAt");
  res.json(orders);
});

export default router;
