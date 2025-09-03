import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const AdminOrders = () => {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors gracefully
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      const token = await getToken();
      const { data } = await axios.get(`${API_URL}/api/orders/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again."); // User-friendly error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    try {
      const token = await getToken();
      await axios.put(
        `${API_URL}/api/orders/update-status/${orderId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh order list immediately after update
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update order status. Please try again."); // User-friendly error message
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-8 lg:p-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
          All Customer Orders
        </h2>

        {loading && (
          <div className="flex justify-center items-center h-48">
            <p className="text-xl text-gray-600">Loading orders...</p>
          </div>
        )}

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-2">{error}</span>
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="flex justify-center items-center h-48">
            <p className="text-xl text-gray-600">No orders found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Order ID:{" "}
                    <span className="font-normal text-gray-600">
                      {order._id.substring(0, 8)}...
                    </span>{" "}
                    {/* Truncate for cleaner look */}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-green-100 text-green-800"
                        : order.status === "Shipped"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">User ID:</strong>{" "}
                  {order.userId.substring(0, 8)}...
                </p>
                <p className="text-gray-600 mb-2">
                  <strong className="text-gray-800">Total:</strong> ₹
                  {order.totalPrice.toFixed(2)}
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  <strong className="text-gray-800">Placed on:</strong>{" "}
                  {new Date(order.createdAt).toLocaleString()}
                </p>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-gray-800 mb-3 text-lg">
                    Products:
                  </h4>
                  <ul className="space-y-2">
                    {order.products.map((prod) => (
                      <li
                        key={prod.productId._id}
                        className="flex justify-between items-center text-gray-700"
                      >
                        <span>
                          {prod.productId.name} x {prod.quantity}
                        </span>
                        <span className="font-medium">
                          ₹{(prod.productId.price * prod.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleStatusUpdate(order._id, "Shipped")}
                    className="flex-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition ease-in-out duration-150 shadow-md"
                  >
                    Mark as Shipped
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order._id, "Delivered")}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition ease-in-out duration-150 shadow-md"
                  >
                    Mark as Delivered
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
