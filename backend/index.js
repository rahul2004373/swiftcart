import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import productRoute from "./routes/productRoute.js";
import multer from "multer";
// import { v2 as cloudinary } from "cloudinary";
import User from "./models/User.js";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cartRoute from "./routes/cartRoute.js";
import adminProductRoute from "./routes/adminProductRoute.js";
import orderRoute from "./routes/orderRoute.js";
import paymentRoute from "./routes/paymentRoutes.js";

const upload = multer({ dest: "uploads/" });
import {
  clerkMiddleware,
  requireAuth,
  getAuth,
  clerkClient,
} from "@clerk/express";
import order from "./models/order.js";

const app = express();

//middleware
app.use(express.json());

const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.use(
  cors({
    origin: "https://swiftcart-ashen.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

//MongoDB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connected to database successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error ", err);
  });

// Clerk middleware for attaching user info to req.auth
app.use(clerkMiddleware());

//Routes (products)

app.use("/api", productRoute);
app.use("/user", userRoute);
app.use("/category", categoryRoute);
//cart route
app.use("/api/cart", cartRoute);

//Admin routes
app.use("/api/admin", adminProductRoute);

//order routes
app.use("/api/orders", orderRoute);
app.use("/api/payment", paymentRoute);

//Basic Route
// app.get("/", (req, res) => {
//   res.send("Ecommerce API is running");
// });

//upload in cloudinary with multer

app.listen(PORT, (req, res) => {
  console.log(`Listening for port ${PORT}`);
});

console.log("=== CLERK CONFIG DEBUG ===");
console.log(
  "CLERK_PUBLISHABLE_KEY:",
  process.env.CLERK_PUBLISHABLE_KEY ? "Present" : "Missing"
);
console.log(
  "CLERK_SECRET_KEY:",
  process.env.CLERK_SECRET_KEY ? "Present" : "Missing"
);
console.log("========================");
