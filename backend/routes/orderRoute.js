import express from "express";
import order from "../models/order.js";
import { requireAuth } from "@clerk/express"; // Clerk middleware

const router = express.Router();

router.post("/create", requireAuth(), async (req, res) => {
  try {
    const { products, shippingAddress, totalPrice } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    if (
      !shippingAddress?.name ||
      !shippingAddress?.phone ||
      !shippingAddress?.addressLine1
    ) {
      return res.status(400).json({ message: "Incomplete shipping address" });
    }

    const newOrder = new order({
      userId: req.auth.userId, // ✅ Clerk user ID
      products,
      shippingAddress,
      totalPrice,
      paymentStatus: "Pending",
      status: "Pending",
    });

    const savedOrder = await newOrder.save();
    res
      .status(201)
      .json({ message: "Order created successfully", order: savedOrder });
  } catch (error) {
    console.error("❌ Order creation failed:", error);
    res
      .status(500)
      .json({ message: "Server error creating order", error: error.message });
  }
});

//route to get history
router.get("/my-orders", async (req, res) => {
  try {
    const orders = await order
      .find({ userId: req.auth.userId })
      .populate("products.productId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ✅ Admin: Get all orders
router.get("/all", requireAuth(), async (req, res) => {
  try {
    // Later you can add admin check here using Clerk roles
    const orders = await order
      .find()
      .populate("products.productId", "name price imageUrl")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

//status update for order

router.put("/update-status/:orderId", async (req, res) => {
  try {
    const { status } = req.body;
    const { orderId } = req.params;

    const updatedOrder = await order
      .findByIdAndUpdate(orderId, { status }, { new: true })
      .populate("products.productId", "name price imageUrl");

    res.status(200).json({ success: true, order: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
