import React, { useState, useEffect } from "react";
import { ShoppingCart, CreditCard, Plus, Minus } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ModernProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError("Product not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-600">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Product not found.
      </div>
    );
  }

  const handleQuantityChange = (action) => {
    if (action === "increase" && selectedQuantity < 10) {
      setSelectedQuantity((prev) => prev + 1);
    } else if (action === "decrease" && selectedQuantity > 1) {
      setSelectedQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${selectedQuantity} of "${product.name}" to cart.`);
  };

  const handleBuyNow = () => {
    console.log(`Buying ${selectedQuantity} of "${product.name}".`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full max-h-[500px] object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold">
            {product.category}
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>

          {/* Additional Info */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>
              <strong>SKU:</strong> {product._id}
            </p>
            {product.brand && (
              <p>
                <strong>Brand:</strong> {product.brand}
              </p>
            )}
            <p>
              <strong>Ships in:</strong> 2-5 business days
            </p>
          </div>

          {/* Price */}
          <div className="text-4xl font-bold text-gray-900">
            ₹{(product.price || 0).toLocaleString()}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-2.5 h-2.5 rounded-full ${
                product.countInStock ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span className="text-sm font-semibold">
              {product.countInStock
                ? `In Stock (${product.stockCount || "Available"})`
                : "Out of Stock"}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Actions */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-900">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 rounded-xl">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  disabled={selectedQuantity <= 1}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                  {selectedQuantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  disabled={selectedQuantity >= 10}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 px-6 rounded-xl"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl"
              >
                <CreditCard className="w-5 h-5" />
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernProductPage;
