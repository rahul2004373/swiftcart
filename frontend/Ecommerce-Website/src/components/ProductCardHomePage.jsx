import React from "react";

const ProductCardHomePage = ({
  image,
  title,
  price,
  originalPrice,
  discount,
  badge,
}) => {
  return (
    <div className="group flex-shrink-0 w-40 sm:w-44 md:w-48 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {badge && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
            {badge}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-tight">
          {title}
        </h3>

        <div className="space-y-1">
          {price && (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">{price}</span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {originalPrice}
                </span>
              )}
            </div>
          )}

          {discount && (
            <div className="text-sm font-medium text-green-600">{discount}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCardHomePage;
