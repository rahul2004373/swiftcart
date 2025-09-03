import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [noResults, setNoResults] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        searchProducts(query); // ✅ Same logic
      } else {
        setResults([]);
        setNoResults(false);
        setShowPopup(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleProductClick = (id) => {
    setShowPopup(false);
    setQuery(""); // ✅ Clear search bar
    navigate(`/api/products/${id}`);
  };

  // ✅ Your search logic (unchanged)
  const searchProducts = async (searchTerm) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/products/search?q=${searchTerm}`
      );
      if (Array.isArray(data)) {
        setResults(data);
        setNoResults(data.length === 0); // ✅ Only this line added for UI
        setShowPopup(true);
      } else {
        setResults([]);
        setNoResults(true);
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Search failed:", err);
      setResults([]);
      setNoResults(true);
      setShowPopup(true);
    }
  };

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setShowPopup(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleKeyDown = (e) => {
    if (!showPopup) return;

    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && results.length > 0) {
      handleProductClick(results[selectedIndex]._id);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm hover:shadow-md"
        />
      </div>

      {/* Popup Search Results */}
      {showPopup && (
        <div
          ref={popupRef}
          className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto animate-fadeIn"
        >
          {noResults ? (
            <div className="flex items-center gap-2 px-4 py-3 text-gray-500">
              <AlertCircle className="w-5 h-5 text-gray-400" />
              No results found
            </div>
          ) : (
            results.map((product, index) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className={`cursor-pointer px-4 py-2 transition ${
                  index === selectedIndex
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-blue-50"
                }`}
              >
                <div className="font-semibold">{product.name}</div>
                <div className="text-sm text-gray-500 truncate">
                  {product.description}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
