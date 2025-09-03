import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ElectronicsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/category/books`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching books:", err);
        setLoading(false);
      }
    };

    fetchElectronics();
  }, []);

  if (loading)
    return (
      <div className="p-8 text-center">
        <DotLottieReact src="path/to/animation.lottie" loop autoplay />
      </div>
    );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Books</h1>
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ElectronicsPage;
