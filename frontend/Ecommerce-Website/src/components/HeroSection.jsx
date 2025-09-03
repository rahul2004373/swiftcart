import React from "react";
import {
  ArrowRight,
  Star,
  Truck,
  Shield,
  Headphones,
  Zap,
  Award,
  Users,
  Link,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/api/products");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="text-center">
          {/* Trust Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4 lg:mb-6">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Trusted by 50,000+ customers
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-4 lg:mb-6">
            Discover Amazing
            <span className="block text-blue-600">Products</span>
            <span className="hidden lg:block">Every Day</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 lg:mb-8 max-w-3xl mx-auto">
            Shop premium products with fast delivery and unbeatable prices
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 justify-center mb-8 lg:mb-12">
            <button className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Shop Now
              <ArrowRight className="ml-2 w-4 lg:w-5 h-4 lg:h-5" />
            </button>
            <button
              onClick={handleClick}
              className="inline-flex items-center justify-center px-6 lg:px-8 py-3 lg:py-4 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              View Categories
            </button>
          </div>

          {/* Stats - Compact for Mobile */}
          <div className="grid grid-cols-3 gap-4 lg:gap-8 max-w-md lg:max-w-2xl mx-auto mb-8 lg:mb-12">
            <div className="text-center">
              <div className="text-xl lg:text-3xl font-bold text-gray-900">
                50K+
              </div>
              <div className="text-xs lg:text-sm text-gray-600">Customers</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-3xl font-bold text-gray-900">
                10K+
              </div>
              <div className="text-xs lg:text-sm text-gray-600">Products</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-3xl font-bold text-gray-900">
                99%
              </div>
              <div className="text-xs lg:text-sm text-gray-600">
                Satisfaction
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Compact */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
          {/* Mobile: 1 column, Desktop: 3 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Free Shipping */}
            <div className="flex items-center space-x-3 lg:space-x-4 p-4 lg:p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300 group">
              <div className="flex-shrink-0">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <Truck className="w-5 lg:w-6 h-5 lg:h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-sm lg:text-lg font-semibold text-gray-900">
                  Free Shipping
                </h3>
                <p className="text-xs lg:text-base text-gray-600">
                  On orders over $50
                </p>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="flex items-center space-x-3 lg:space-x-4 p-4 lg:p-6 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors duration-300 group">
              <div className="flex-shrink-0">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <Shield className="w-5 lg:w-6 h-5 lg:h-6 text-green-600" />
                </div>
              </div>
              <div>
                <h3 className="text-sm lg:text-lg font-semibold text-gray-900">
                  Secure Payment
                </h3>
                <p className="text-xs lg:text-base text-gray-600">
                  100% protected
                </p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex items-center space-x-3 lg:space-x-4 p-4 lg:p-6 bg-gray-50 rounded-lg hover:bg-purple-50 transition-colors duration-300 group">
              <div className="flex-shrink-0">
                <div className="w-10 lg:w-12 h-10 lg:h-12 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors duration-300">
                  <Headphones className="w-5 lg:w-6 h-5 lg:h-6 text-purple-600" />
                </div>
              </div>
              <div>
                <h3 className="text-sm lg:text-lg font-semibold text-gray-900">
                  24/7 Support
                </h3>
                <p className="text-xs lg:text-base text-gray-600">
                  Always here to help
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
