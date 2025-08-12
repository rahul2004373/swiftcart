import React, { useState, useEffect } from "react";
import { Menu, X, User, ShoppingCart, Search, ChevronDown } from "lucide-react";

interface NavbarProps {
  cartItemCount?: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartItemCount = 3 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const navigationLinks = [
    { name: "Home", href: "#" },
    {
      name: "Products",
      href: "#",
      hasDropdown: true,
      categories: [
        { name: "Electronics", href: "#" },
        { name: "Fashion", href: "#" },
        { name: "Books", href: "#" },
        { name: "Home & Kitchen", href: "#" },
        { name: "Sports & Fitness", href: "#" },
        { name: "Beauty & Personal Care", href: "#" },
      ],
    },
    { name: "Cart", href: "#" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }

    // Cleanup function to reset styles when component unmounts
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Main Navbar - Fixed positioning to stay on top */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <a
                href="/"
                className="text-2xl font-bold text-blue-700 hover:text-blue-800 transition-colors duration-200"
              >
                ShopZone
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropdown && setIsProductsDropdownOpen(true)
                  }
                  onMouseLeave={() =>
                    item.hasDropdown && setIsProductsDropdownOpen(false)
                  }
                >
                  <a
                    href={item.href}
                    className="text-gray-800 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors duration-200 flex items-center"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )}
                  </a>

                  {/* Desktop Dropdown for Products */}
                  {item.hasDropdown && isProductsDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                      {item.categories?.map((category) => (
                        <a
                          key={category.name}
                          href={category.href}
                          className="block px-4 py-2 text-sm text-gray-800 hover:text-blue-700 hover:bg-gray-50 transition-colors duration-200"
                        >
                          {category.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search Bar - Desktop Only */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-700 focus:ring-1 focus:ring-blue-700 sm:text-sm transition-colors duration-200"
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="flex items-center space-x-4">
              {/* User Profile Icon */}
              <button
                className="text-gray-800 hover:text-blue-700 transition-colors duration-200 p-2"
                aria-label="User Profile"
              >
                <User className="h-6 w-6" />
              </button>

              {/* Cart Icon with Badge */}
              <button
                className="relative text-gray-800 hover:text-blue-700 transition-colors duration-200 p-2"
                aria-label="Shopping Cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {cartItemCount > 99 ? "99+" : cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={toggleMobileMenu}
                  className="text-gray-800 hover:text-blue-700 transition-colors duration-200 p-2"
                  aria-label="Toggle mobile menu"
                >
                  <Menu className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Enhanced animations */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop with fade animation */}
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ease-in-out"
            onClick={toggleMobileMenu}
          />

          {/* Mobile Menu Panel with slide animation */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
              <button
                onClick={toggleMobileMenu}
                className="text-gray-800 hover:text-blue-700 transition-colors duration-200 p-2 rounded-full hover:bg-gray-50"
                aria-label="Close mobile menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex flex-col h-full">
              {/* Search Bar - Mobile */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:border-blue-700 focus:ring-1 focus:ring-blue-700 sm:text-sm transition-all duration-200"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-2 space-y-1">
                  {navigationLinks.map((item) => (
                    <div key={item.name}>
                      <a
                        href={item.href}
                        className="text-gray-800 hover:text-blue-700 hover:bg-gray-50 block px-3 py-3 text-base font-medium transition-all duration-200 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>

                      {/* Mobile Categories for Products */}
                      {item.hasDropdown && item.categories && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.categories.map((category) => (
                            <a
                              key={category.name}
                              href={category.href}
                              className="text-gray-500 hover:text-blue-700 hover:bg-gray-50 block px-3 py-2 text-sm transition-all duration-200 rounded-md"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {category.name}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="border-t border-gray-200 p-4">
                <div className="flex items-center justify-center space-x-6">
                  <button
                    className="flex items-center text-gray-800 hover:text-blue-700 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
                    aria-label="User Profile"
                  >
                    <User className="h-5 w-5 mr-2" />
                    <span className="text-sm font-medium">Profile</span>
                  </button>

                  <button
                    className="flex items-center text-gray-800 hover:text-blue-700 transition-colors duration-200 p-2 rounded-md hover:bg-gray-50"
                    aria-label="Shopping Cart"
                  >
                    <div className="relative">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-2 -right-1 bg-orange-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-medium">
                          {cartItemCount > 99 ? "99+" : cartItemCount}
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-medium">Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
