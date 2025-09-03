// backend/routes/adminRoutes.js
import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";
// import order from "../models/order.js";
import { getAuth, clerkClient } from "@clerk/express";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// ✅ Middleware: Admin check
const requireAdmin = async (req, res, next) => {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const user = await clerkClient.users.getUser(userId);
    if (user.publicMetadata?.role !== "admin") {
      return res.status(403).json({ message: "Admins only" });
    }
    next();
  } catch (err) {
    console.error("Admin check error:", err);
    res.status(500).json({ message: "Admin check failed" });
  }
};

// ✅ CREATE Product (with image upload)
router.post(
  "/products/upload",
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, description, category, countInStock } = req.body;

      if (!req.file)
        return res.status(400).json({ message: "No image uploaded" });

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "Ecommerce-Website" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        stream.end(req.file.buffer);
      });

      const newProduct = new Product({
        name,
        description,
        price,
        category,
        countInStock: countInStock || 0,
        imageUrl: uploadResult.secure_url,
      });

      await newProduct.save();
      res
        .status(201)
        .json({ message: "Product created successfully", product: newProduct });
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: err.message || "Upload failed" });
    }
  }
);

// ✅ GET all products
router.get("/products", requireAdmin, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

// ✅ UPDATE Product with optional image
router.put(
  "/products/:id",
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, description, category, countInStock } = req.body;
      let updatedData = { name, price, description, category, countInStock };

      // If a new image is uploaded, push to Cloudinary
      if (req.file) {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "Ecommerce-Website" },
            (error, result) => (error ? reject(error) : resolve(result))
          );
          stream.end(req.file.buffer);
        });
        updatedData.imageUrl = uploadResult.secure_url;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      );
      if (!updatedProduct)
        return res.status(404).json({ message: "Product not found" });

      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: err.message || "Update failed" });
    }
  }
);

// ✅ GET all users from Clerk
router.get("/users", requireAdmin, async (req, res) => {
  try {
    const users = await clerkClient.users.getUserList({
      limit: 50, // fetch first 50 users
    });

    const formattedUsers = users.data.map((u) => ({
      id: u.id,
      email: u.emailAddresses?.[0]?.emailAddress,
      firstName: u.firstName,
      lastName: u.lastName,
      role: u.publicMetadata?.role || "user",
    }));

    res.json(formattedUsers);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ✅ UPDATE User Role
router.patch("/users/:id/role", requireAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    if (!role) {
      return res.status(400).json({ message: "Role is required" });
    }

    // Update Clerk user's publicMetadata.role
    await clerkClient.users.updateUser(req.params.id, {
      publicMetadata: { role },
    });

    res.json({ message: `User role updated to ${role}` });
  } catch (err) {
    console.error("Role update error:", err);
    res.status(500).json({ message: "Failed to update user role" });
  }
});

//get all orders
router.get("/all", async (req, res) => {
  try {
    const orders = await order.find().populate("products.productId");
    res.status(200).json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
