import React from "react";
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
import { Link } from "react-router-dom";
const Categoriessection = () => {
  const categories = [
    { name: "All Categories", icon: Grid3X3, href: "/api/products" },
    { name: "Electronics", icon: Smartphone, href: "/category/electronics" },
    { name: "Fashion", icon: Shirt, href: "/category/fashion" },
    { name: "Sports", icon: Dumbbell, href: "/category/sports" },
    { name: "Books", icon: BookOpen, href: "/category/books" },
  ];
  return (
    <div>
      {/* Categories Section - Desktop */}
      <div className="hidden md:block bg-white-50 border-t border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center justify-center space-x-8 py-4">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={category.href}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white hover:shadow-md hover:scale-105 transform group ${
                  index === 0
                    ? "text-blue-600 bg-blue-100"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <category.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                <span>{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categoriessection;
