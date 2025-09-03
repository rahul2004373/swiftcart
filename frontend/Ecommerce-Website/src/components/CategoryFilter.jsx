import React from "react";

const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Shop by Category</h3>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-lg transform scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
