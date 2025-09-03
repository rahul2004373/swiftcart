import express from "express";
import User from "../models/User.js"; // Your modified Mongoose User model

const router = express.Router();

// Get user profile (protected route, requires Clerk authentication)
router.get("/profile", async (req, res) => {
  try {
    const { userId } = req.auth; // Clerk's userId

    // Get the full user object from Clerk (for name, email etc.)
    const clerkUser = await req.clerk.users.getUser(userId);

    // Find or create your Mongoose user document
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      // If user doesn't exist in your DB, create it
      user = await User.create({
        clerkId: userId,
        name: clerkUser.firstName + " " + clerkUser.lastName, // Or use clerkUser.fullName
        email: clerkUser.emailAddresses[0].emailAddress,
        // isAdmin will default to false, you can set it based on Clerk metadata if needed
      });
    }

    res.json({
      _id: user._id,
      clerkId: user.clerkId,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      // Add other app-specific user data here
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// //route to get history
// router.get("/my-orders", async (req, res) => {
//   try {
//     const orders = await order
//       .find({ userId: req.auth.userId })
//       .populate("products.productId");
//     res.status(200).json({ success: true, orders });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

export default router;

// Don't forget to use this router in your index.js:
// app.use('/api/users', userRoutes);
