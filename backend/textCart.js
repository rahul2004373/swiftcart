import axios from "axios";

// ✅ Replace this with a fresh Clerk token
const token = "YOUR_VALID_CLERK_TOKEN";
const productId = "687e35246f4ef3342146e8ec"; // Use a real product ID from your DB

const testCart = async () => {
  try {
    console.log("🚀 Sending POST /api/cart/add");

    const res = await axios.post(
      "http://localhost:8080/api/cart/add",
      { productId, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ Cart updated:", res.data);

    console.log("🚀 Fetching cart...");
    const cart = await axios.get("http://localhost:8080/api/cart", {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("🛒 Current Cart:", cart.data);
  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
  }
};

testCart();
