import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Loader2, Package, ChevronDown, ChevronUp } from "lucide-react";

const OrderHistory = () => {
  const { getToken } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = await getToken();
        const { data } = await axios.get(
          "http://localhost:8080/api/orders/my-orders",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(data.orders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [getToken]);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-indigo-600 text-4xl" />
        <p className="ml-4 text-lg text-gray-700">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-100 border border-red-400 text-red-700 rounded-md mx-auto max-w-lg">
        <p className="font-semibold text-lg">Oops! Something went wrong.</p>
        <p>{error}</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-md mx-auto max-w-lg">
        <Package className="text-indigo-400 text-6xl mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
          No Orders Found
        </h3>
        <p className="text-gray-600">
          It looks like you haven't placed any orders yet.
        </p>
        <p className="text-gray-600">
          Start shopping now to see your order history here!
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
        My Order History
      </h2>
      <div className="space-y-6 max-w-4xl mx-auto">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden"
          >
            <div
              className="p-5 cursor-pointer flex justify-between items-center"
              onClick={() => toggleOrderDetails(order._id)}
            >
              <div>
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">Order ID:</span>{" "}
                  {order._id}
                </p>
                <p className="text-xl font-bold text-gray-800">
                  Total: ₹{order.totalPrice.toLocaleString("en-IN")}
                </p>
                <p
                  className={`text-sm font-semibold mt-1 ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-blue-600"
                  }`}
                >
                  Status: {order.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  <span className="font-semibold text-gray-700">
                    Order Date:
                  </span>{" "}
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                {expandedOrder === order._id ? (
                  <ChevronUp className="text-gray-500 text-lg mt-2" />
                ) : (
                  <ChevronDown className="text-gray-500 text-lg mt-2" />
                )}
              </div>
            </div>

            {expandedOrder === order._id && (
              <div className="border-t border-gray-200 bg-gray-50 p-5">
                {order.items && order.items.length > 0 && (
                  <>
                    <h4 className="text-lg font-semibold text-gray-800 mb-3">
                      Items Ordered
                    </h4>
                    <ul className="space-y-2 text-gray-700 mb-4">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center border-b border-gray-200 pb-2 last:border-b-0 last:pb-0"
                        >
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <span className="font-semibold text-gray-800">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Shipping Address Section - Improved Formatting */}
                {order.shippingAddress && (
                  <div className="mt-4 p-4 bg-white rounded-md shadow-sm border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-2">
                      Shipping Address:
                    </p>
                    <address className="not-italic text-gray-700 space-y-1">
                      {order.shippingAddress.name && (
                        <p>{order.shippingAddress.name}</p>
                      )}
                      {order.shippingAddress.street && (
                        <p>{order.shippingAddress.street}</p>
                      )}
                      {order.shippingAddress.apartment && (
                        <p>{order.shippingAddress.apartment}</p>
                      )}{" "}
                      {/* Added for apartment/unit number */}
                      <p>
                        {order.shippingAddress.city},{" "}
                        {order.shippingAddress.state}{" "}
                        {order.shippingAddress.zipCode}
                      </p>
                      {order.shippingAddress.country && (
                        <p>{order.shippingAddress.country}</p>
                      )}
                    </address>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
