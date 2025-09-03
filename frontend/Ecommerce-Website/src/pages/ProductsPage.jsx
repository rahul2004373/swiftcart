import React, { useEffect, useState, useMemo } from "react";
import { Search, Filter, ShoppingBag } from "lucide-react";
import ProductCard from "../components/ProductCard";
import CategoryFilter from "../components/CategoryFilter";
import axios from "axios";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["all", "books", "sports", "fashion", "electronics"];
  const API_URL = process.env.REACT_APP_API_URL;

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data);
        // console.log("All Products", res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
        // setProducts([]);
      }
    };

    fetchProducts();
  }, []);
  console.log("All Products:", products);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [products, selectedCategory, searchQuery]);

  console.log(filteredProducts);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      {/* <h1 className="mt-8 flex items-center justify-center text-4xl font-bold">
        Products Page
      </h1> */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Filters */}
          <aside className="lg:w-80 flex-shrink-0 lg:sticky top-35 self-start  h-fit">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedCategory === "all"
                    ? "All Products"
                    : `${
                        selectedCategory.charAt(0).toUpperCase() +
                        selectedCategory.slice(1)
                      } Collection`}
                </h2>
                <p className="text-gray-600">
                  Discover amazing products at great prices
                </p>
              </div>
              <div className="flex items-center text-sm text-gray-600 bg-white px-4 py-2 rounded-lg border">
                <Filter size={16} className="mr-2" />
                {Array.isArray(filteredProducts)
                  ? filteredProducts.length
                  : 0}{" "}
                products
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
