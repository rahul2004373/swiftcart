//Header.jsx

import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
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
import SearchBar from "./SearchBar";
import CartContext from "../context/cartContext";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const { isLoaded, userId } = useAuth();

  const { isSignedIn, user } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems =
    cart?.items.reduce((total, item) => total + item.quantity, 0) || 0;

  const categories = [
    { name: "All Categories", icon: Grid3X3, href: "/api/products" },
    { name: "Electronics", icon: Smartphone, href: "/category/electronics" },
    { name: "Fashion", icon: Shirt, href: "/category/fashion" },
    { name: "Sports", icon: Dumbbell, href: "/category/sports" },
    { name: "Books", icon: BookOpen, href: "/category/books" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
            >
              ShopHub
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchBar />
              </div>
            </div>
          </div>

          {/* search  */}

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
            >
              Contact Us
            </Link>
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
              <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-blue-50"
              >
                Login
              </Link>
            )}

            {/* Cart Icon */}
            <Link
              to="/api/cart"
              className="relative p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 hover:scale-110 transform "
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            </Link>

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
              {/* <div className="relative">
                <SearchBar />
              </div> */}

              {/* Mobile Navigation */}
              <div className="border-t border-gray-200 pt-4">
                <div className="space-y-2">
                  <Link
                    to="/"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>

              {/* Mobile Categories */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Categories
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category, index) => (
                    <Link
                      key={category.name}
                      to={category.href}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        index === 0
                          ? "text-blue-600 bg-blue-100"
                          : "text-gray-700 bg-gray-50 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
