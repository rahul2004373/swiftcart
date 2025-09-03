import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CheckOutPage = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems || [];
  const totalPrice = location.state?.totalPrice || 0;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true); // Avoid loading twice
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0) {
      alert("No items found in cart. Please add products first.");
      return;
    }

    try {
      const token = await getToken();
      const formattedProducts = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));

      // 1️⃣ Load Razorpay SDK
      const res = await loadRazorpay();
      if (!res) {
        alert("Razorpay SDK failed to load");
        return;
      }

      // 2️⃣ Create Razorpay order from backend
      const { data } = await axios.post(
        "http://localhost:8080/api/payment/create-order",
        {
          amount: totalPrice,
          currency: "INR",
        }
      );

      if (!data?.order) {
        console.error("Backend response error:", data);
        alert("Payment gateway failed to create order.");
        return;
      }

      const { id: order_id, amount, currency } = data.order;

      // ✅ Load Razorpay key from Vite environment
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        alert("Razorpay Key is missing. Check your .env file.");
        return;
      }

      // 3️⃣ Open Razorpay checkout popup
      const options = {
        key: razorpayKey,
        amount: amount,
        currency: currency,
        name: "My E-Commerce Store",
        description: "Payment for your order",
        order_id: order_id,
        handler: async function (response) {
          try {
            console.log("📦 Saving order to backend...");

            const token = await getToken(); // remove template for now
            console.log("Clerk token before order save:", token);

            const orderRes = await axios.post(
              "http://localhost:8080/api/orders/create",
              {
                products: formattedProducts,
                shippingAddress: formData,
                totalPrice,
              },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            console.log("✅ Order saved:", orderRes.data);
            alert("✅ Payment & Order successful!");
            navigate("/api/orders/order-history");
          } catch (err) {
            console.error(
              "❌ Order save error:",
              err.response?.data || err.message
            );
          }
        },
        prefill: {
          name: formData.name,
          email: "customer@example.com",
          contact: formData.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error.response?.data || error.message);
      alert("❌ Failed to start payment process. Check console for details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6 sm:p-10">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Delivery Details
        </h2>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="name"
            placeholder="Full Name"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            onChange={handleChange}
          />
          <input
            name="addressLine1"
            placeholder="Address Line 1"
            className="sm:col-span-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            onChange={handleChange}
          />
          <input
            name="addressLine2"
            placeholder="Address Line 2 (Optional)"
            className="sm:col-span-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            onChange={handleChange}
          />
          <input
            name="city"
            placeholder="City"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            onChange={handleChange}
          />
          <input
            name="state"
            placeholder="State"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            onChange={handleChange}
          />
          <input
            name="postalCode"
            placeholder="Postal Code"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            onChange={handleChange}
          />
        </div>

        {/* Summary */}
        <div className="mt-6 p-4 bg-gray-100 rounded-xl flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Amount:</span>
          <span className="text-lg font-bold text-gray-900">₹{totalPrice}</span>
        </div>

        {/* Button */}
        <button
          onClick={handleConfirmOrder}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-semibold py-3 rounded-xl shadow-md"
        >
          Confirm & Pay ₹{totalPrice}
        </button>
      </div>
    </div>
  );
};

export default CheckOutPage;
