import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import cartRoutes from "./routes/cartRoutes.js";

// route files
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";

// 1. ENV CONFIG
dotenv.config();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URL;

// 2. APP INITIALISATION
const app = express();

// 3. GLOBAL MIDDLEWARE
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}
app.use("/api/cart", cartRoutes);

// 4. ROUTES
app.get("/", (req, res) => res.send("API is running 🚀"));
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);

// 5. ERROR HANDLERS
app.use((req, res, next) => {
  const error = new Error(`Not Found – ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
});

// 6. DATABASE & SERVER BOOTSTRAP
const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

startServer();
