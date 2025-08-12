import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";

dotenv.config();

const sampleProducts = [
  {
    name: "Wooden Bed",
    slug: "wooden-bed",
    description: "A high-quality wooden bed with storage.",
    price: 14999,
    category: "Beds",
    quantity: 20,
    images: [
      "https://example.com/images/bed1.jpg",
      "https://example.com/images/bed2.jpg",
    ],
    shipping: true,
  },
  {
    name: "Sofa Set",
    slug: "sofa-set",
    description: "Comfortable and stylish 5-seater sofa set.",
    price: 19999,
    category: "Sofas",
    quantity: 15,
    images: [
      "https://example.com/images/sofa1.jpg",
      "https://example.com/images/sofa2.jpg",
    ],
    shipping: true,
  },
];

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("✅ Sample products added");
    process.exit();
  } catch (err) {
    console.error("❌ Seeder error:", err.message);
    process.exit(1);
  }
};

start();
