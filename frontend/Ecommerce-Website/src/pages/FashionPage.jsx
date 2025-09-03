import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const FashionPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/category/fashion`);
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching electronics:", err);
        setLoading(false);
      }
    };

    fetchElectronics();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Fashion Page</h1>
      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:grid-cols-4 p-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FashionPage;
