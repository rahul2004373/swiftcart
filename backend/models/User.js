import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Clerk's user ID to link to their authentication system
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true, // Add an index for faster lookups
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // The password field is NOT needed here if Clerk handles authentication

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    // Add other e-commerce specific fields here (e.g., shippingAddress, phone, etc.)
    shippingAddress: {
      address: { type: String },
      city: { type: String },
      postalCode: { type: String },
      country: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

// Remove pre-save hooks and methods related to password hashing/comparison/JWT generation
// as Clerk handles these.
// userSchema.pre("save", async function (next) { ... });
// userSchema.methods.matchPassword = async function (enteredPassword) { ... };
// userSchema.methods.generateAuthToken = function () { ... };

const User = mongoose.model("User", userSchema);

export default User;
