// backend/routes/paymentRoutes.js
import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";

import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// ✅ Ensure keys are loaded
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay API keys missing in environment variables");
}

// ✅ Create Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Route to create order
router.post("/create-order", async (req, res) => {
  try {
    let { amount, currency } = req.body;

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount provided" });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: currency || "INR",
      receipt: `order_rcptid_${Date.now()}`,
    };

    console.log("📌 Creating Razorpay Order:", options);

    const order = await razorpay.orders.create(options);
    console.log("✅ Order Created:", order);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("❌ Razorpay Order Error:", error);
    res.status(500).json({
      success: false,
      message:
        error.error?.description || error.message || "Order creation failed",
    });
  }
});

// ✅ Route to verify payment
router.post("/verify-payment", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment verification data" });
    }

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (sign === razorpay_signature) {
      console.log("✅ Payment verified successfully");
      return res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    } else {
      console.warn("⚠️ Payment verification failed");
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (err) {
    console.error("❌ Verification error:", err);
    return res
      .status(500)
      .json({ success: false, message: "Payment verification process failed" });
  }
});

export default router;
