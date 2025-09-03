import React, { useState, useEffect, useRef } from "react"; // Add useRef for dropdown
import axios from "axios"; // Import axios
import {
  Search,
  User,
  ShoppingCart,
  Smartphone,
  Shirt,
  Dumbbell,
  BookOpen,
  Grid3X3,
  Menu,
  X,
} from "lucide-react";
import { UserButton, useUser, useAuth } from "@clerk/clerk-react";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const Header = () => {
  const { isLoaded, userId } = useAuth();
  const { cart, addToCart } = useCart();
  const { isSignedIn, user } = useUser();
  const navigate = useNavigate(); // Initialize navigate hook

  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [isSearching, setIsSearching] = useState(false); // State to show loading/searching status
  const [showSearchResults, setShowSearchResults] = useState(false); // State to control dropdown visibility
  const searchDropdownRef = useRef(null); // Ref for closing dropdown on outside click
  const API_URL = import.meta.env.VITE_API_URL;

  const categories = [
    { name: "All Categories", icon: Grid3X3, href: "/api/products" },
    { name: "Electronics", icon: Smartphone, href: "/category/electronics" },
    { name: "Fashion", icon: Shirt, href: "/category/fashion" },
    { name: "Sports", icon: Dumbbell, href: "/category/sports" },
    { name: "Books", icon: BookOpen, href: "/category/books" },
  ];

  // Function to handle search submission (e.g., on Enter key or search button click)
  const handleSearchSubmit = async () => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      // **IMPORTANT: Adjust this URL to your actual backend search endpoint**
      // Example: If your backend search is at /api/products/search?q=query
      const response = await axios.get(
        `${API_URL}/api/products/search?q=${searchQuery}`
      );
      setSearchResults(response.data);
      setShowSearchResults(true); // Show dropdown with results
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
      setShowSearchResults(false);
    } finally {
      setIsSearching(false);
    }
  };

  // Optional: Debounce for live search suggestions (more complex)
  // For now, we'll stick to search on submit.
  // If you want live search as you type, you'd use useEffect with a debounce.

  // Handle closing search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
              ShopHub
            </h1>
          </div>

          {/* Search Bar - Desktop */}
          <div
            className="hidden md:flex flex-1 max-w-lg mx-8 relative"
            ref={searchDropdownRef}
          >
            {" "}
            {/* Add ref here */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  // Trigger search on Enter key
                  if (e.key === "Enter") {
                    handleSearchSubmit();
                    navigate(`/search-results?query=${searchQuery}`); // Navigate to a search results page
                    setShowSearchResults(false); // Hide dropdown on navigation
                  }
                }}
                onFocus={() => {
                  // Show dropdown when input is focused if there are results
                  if (searchResults.length > 0) {
                    setShowSearchResults(true);
                  }
                }}
                placeholder="Search products..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-400"
              />
              {/* Optional: A search button next to the input */}
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-600 hover:text-blue-800"
                onClick={handleSearchSubmit} // Trigger search on button click
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
            {/* Search Results Dropdown (Desktop) */}
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                {searchResults.map((product) => (
                  <a
                    key={product._id}
                    href={`/product/${product._id}`} // Link to product detail page
                    className="flex items-center p-2 hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                    onClick={() => setShowSearchResults(false)} // Hide dropdown on click
                  >
                    {product.imageUrl && (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-10 h-10 object-cover rounded mr-2"
                      />
                    )}
                    <div>
                      <p className="font-medium text-gray-800">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                  </a>
                ))}
                {/* Option to view all results on a dedicated page */}
                {searchResults.length > 0 && ( // Only show if there are results
                  <div className="p-2 border-t border-gray-200 text-center">
                    <button
                      onClick={() => {
                        navigate(`/search-results?query=${searchQuery}`);
                        setShowSearchResults(false);
                      }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View all results for "{searchQuery}"
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              About Us
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              Contact Us
            </a>
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Show UserButton if signed in, else Login link */}
            {isSignedIn ? (
              <UserButton
                userProfileMode="navigation"
                userProfileUrl="/dashboard"
                afterSignOutUrl="/login"
                userProfileNavigation={(url) =>
                  url.includes("/profile") ? "/dashboard" : url
                }
              />
            ) : (
              <a
                href="/login"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
              >
                Login
              </a>
            )}

            {/* Cart Icon */}
            <button
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110 transform"
              // Fix: The addToCart here needs a specific product ID and quantity.
              // This button should probably just navigate to the cart page.
              onClick={() => navigate("/cart")} // Navigate to cart page
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                {cart.length || 0}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    // Trigger search on Enter key for mobile
                    if (e.key === "Enter") {
                      handleSearchSubmit();
                      navigate(`/search-results?query=${searchQuery}`);
                      setIsMobileMenuOpen(false); // Close mobile menu after search
                    }
                  }}
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {/* Mobile Search Results (if you want them here) */}
                {/* You might want a simpler display for mobile or navigate directly */}
              </div>

              {/* Mobile Navigation */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <a
                    href="/"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    Home
                  </a>
                  <a
                    href="/about"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    About Us
                  </a>
                  <a
                    href="/contact"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    Contact Us
                  </a>
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Categories
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category, index) => (
                    <a
                      key={category.name}
                      href={category.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        index === 0
                          ? "text-blue-600 bg-blue-100"
                          : "text-gray-700 bg-gray-50 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Categories Section - Desktop */}
      <div className="hidden md:block bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-center space-x-8 py-4">
            {categories.map((category, index) => (
              <a
                key={category.name}
                href={category.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-105 transform group ${
                  index === 0
                    ? "text-blue-600 bg-blue-100"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <category.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>{category.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
