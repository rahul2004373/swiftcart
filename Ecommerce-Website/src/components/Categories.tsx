import React from "react";
import {
  Smartphone,
  Shirt,
  Book,
  Home,
  Gamepad2,
  Headphones,
  Camera,
  Watch,
  Dumbbell,
  Baby,
  Car,
  Palette,
} from "lucide-react";

interface Category {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
}

const Categories: React.FC = () => {
  const categories: Category[] = [
    { name: "Electronics", icon: Smartphone, href: "#" },
    { name: "Fashion", icon: Shirt, href: "#" },
    { name: "Books", icon: Book, href: "#" },
    { name: "Home & Kitchen", icon: Home, href: "#" },
    { name: "Gaming", icon: Gamepad2, href: "#" },
    { name: "Audio", icon: Headphones, href: "#" },
    { name: "Photography", icon: Camera, href: "#" },
    { name: "Watches", icon: Watch, href: "#" },
    { name: "Sports & Fitness", icon: Dumbbell, href: "#" },
    { name: "Baby & Kids", icon: Baby, href: "#" },
    { name: "Automotive", icon: Car, href: "#" },
    { name: "Art & Crafts", icon: Palette, href: "#" },
  ];

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Desktop View - Horizontal layout */}
          <div className="hidden md:grid md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-12 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <a
                  key={category.name}
                  href={category.href}
                  className="flex flex-col items-center group hover:bg-gray-50 rounded-lg p-3 transition-all duration-200"
                >
                  <div className="bg-gray-50 p-3 rounded-full group-hover:bg-blue-700 group-hover:scale-105 transition-all duration-200 mb-2">
                    <IconComponent className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <span className="text-xs font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200 text-center">
                    {category.name}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Mobile View - Horizontal scrollable */}
          <div className="md:hidden">
            <div className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <a
                    key={category.name}
                    href={category.href}
                    className="flex flex-col items-center group hover:bg-gray-50 rounded-lg p-3 transition-all duration-200 min-w-max"
                  >
                    <div className="bg-gray-50 p-3 rounded-full group-hover:bg-blue-700 group-hover:scale-105 transition-all duration-200 mb-2">
                      <IconComponent className="h-5 w-5 text-gray-500 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <span className="text-xs font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200 text-center">
                      {category.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
