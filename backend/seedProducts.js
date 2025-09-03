import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";
import User from "./models/User.js";
import { productsData } from "./data/products.js";
import colors from "colors";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(colors.cyan.underline("MongoDB connected for seeding!"));
  } catch (error) {
    console.error(colors.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await Product.deleteMany(); // Clear existing products
    await User.deleteMany(); // Clear existing users

    await Product.insertMany(productsData); // Insert all products

    console.log(colors.green.inverse("Data imported successfully!"));
    process.exit();
  } catch (error) {
    console.error(colors.red.bold(`Error importing data: ${error.message}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    console.log(colors.red.inverse("Data destroyed!"));
    process.exit();
  } catch (error) {
    console.error(colors.red.bold(`Error destroying data: ${error.message}`));
    process.exit(1);
  }
};

connectDB(); // Connect to DB first
importData();
