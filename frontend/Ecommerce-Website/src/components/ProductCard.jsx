import React, { useContext } from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useUser, useAuth, useClerk } from "@clerk/clerk-react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartContext from "../context/cartContext.jsx";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const { fetchCart } = useContext(CartContext);
  const { session } = useClerk();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleAddToCart = async () => {
    if (!isSignedIn) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      const token = await session.getToken();
      await axios.post(
        `${API_URL}/api/cart/add`,
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Product added to cart successfully.");
      await fetchCart();
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const handleBuyNow = () => {
    console.log("Buy now:", product.name);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col w-full max-w-xs mx-auto border border-gray-100">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-400">Incl. taxes</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-gray-200"
          >
            <ShoppingCart size={18} />
            Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
          >
            Buy
            <ArrowRight size={18} />
          </button>
        </div>

        {/* View Details Button */}
        <Link
          to={`/api/products/${product._id}`}
          className="mt-2 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 border border-blue-200"
        >
          View Details
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
