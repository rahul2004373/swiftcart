import React, { useContext } from "react";
import CartContext from "../context/cartContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import {
  MinusCircle,
  PlusCircle,
  Trash2,
  ShoppingBag,
  Star,
  Truck,
  Shield,
  CreditCard,
} from "lucide-react";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  if (!cart) {
    return (
      <div className="flex items-center justify-center py-12 bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      </div>
    );
  }

  const validCartItems = cart.items.filter((item) => item.productId);

  if (validCartItems.length === 0) {
    return (
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-600">
                Discover amazing products and start shopping!
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center justify-center w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = validCartItems.reduce(
    (total, item) => total + (item.productId?.price || 0) * item.quantity,
    0
  );

  const shipping = subtotal > 1000 ? 0 : 99;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    navigate("/api/orders/create", {
      state: {
        cartItems: validCartItems,
        subtotal,
        shipping,
        tax,
        totalPrice: total,
      },
    });
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2">
            {validCartItems.length} item{validCartItems.length !== 1 ? "s" : ""}{" "}
            in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {validCartItems.map((item) => (
              <div
                key={item.productId._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={
                        item.productId.imageUrl ||
                        "https://via.placeholder.com/200"
                      }
                      alt={item.productId.name || "Product Image"}
                      className="w-full sm:w-32 h-32 object-cover rounded-xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                          {item.productId.name || "Product Not Found"}
                        </h3>
                        <div className="flex items-center mt-1"></div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      {/* Price */}
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{(item.productId.price || 0).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">per item</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => decreaseQuantity(item.productId._id)}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-l-lg"
                          >
                            <MinusCircle className="w-5 h-5 text-gray-600" />
                          </button>
                          <span className="px-4 py-2 font-semibold min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantity(item.productId._id)}
                            className="p-2 hover:bg-gray-100 transition-colors rounded-r-lg"
                          >
                            <PlusCircle className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart?.(item.productId._id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                      <span className="text-sm text-gray-600">
                        ₹{(item.productId.price || 0).toFixed(2)} ×{" "}
                        {item.quantity}
                      </span>
                      <span className="text-lg font-bold text-gray-900">
                        ₹
                        {((item.productId.price || 0) * item.quantity).toFixed(
                          2
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({validCartItems.length} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (GST 18%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6 space-y-2">
                <div className="flex items-center text-sm text-green-600">
                  <Truck className="w-4 h-4 mr-2" />
                  <span>Free delivery on orders over ₹1000</span>
                </div>
                <div className="flex items-center text-sm text-blue-600">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Secure checkout with 256-bit SSL</span>
                </div>
                <div className="flex items-center text-sm text-purple-600">
                  <CreditCard className="w-4 h-4 mr-2" />
                  <span>Multiple payment options available</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Proceed to Checkout
              </button>

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="block w-full text-center text-blue-600 py-3 mt-3 font-medium hover:text-blue-700 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
