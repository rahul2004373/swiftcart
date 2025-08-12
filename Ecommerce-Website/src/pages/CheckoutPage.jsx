import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useCart } from "../context/CartContext";

const CheckoutPage = () => {
  const { cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  const [ship, setShip] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const total = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/orders",
        {
          orderItems: cartItems.map((c) => ({
            product: c._id,
            name: c.name,
            qty: c.quantity,
            price: c.price,
            image: c.images[0],
          })),
          shippingAddress: ship,
          paymentMethod: "COD",
          totalPrice: total,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // clear cart & nav to success
      setCartItems([]);
      navigate("/order-success");
    } catch (err) {
      console.error("Order error", err);
      alert("Order failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Shipping form */}
        <form
          onSubmit={placeOrder}
          className="bg-white p-6 rounded shadow space-y-4"
        >
          <h2 className="text-xl font-semibold text-gray-800">Shipping</h2>
          {["fullName", "address", "city", "postalCode", "country"].map(
            (field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={ship[field]}
                onChange={(e) => setShip({ ...ship, [field]: e.target.value })}
                required
                className="w-full border border-gray-200 p-3 rounded"
              />
            )
          )}
          <button className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800">
            Place Order
          </button>
        </form>

        {/* Order summary */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cartItems.map((item) => (
              <li key={item._id} className="py-2 flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₹{item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="text-gray-800 font-bold text-lg">Total: ₹{total}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
