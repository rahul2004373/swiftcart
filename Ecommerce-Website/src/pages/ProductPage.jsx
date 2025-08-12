import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        All Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow p-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded"
            />
            <h3 className="text-lg font-semibold text-gray-800 mt-2">
              {product.name}
            </h3>
            <p className="text-orange-500 font-bold mt-1">₹{product.price}</p>
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow p-4 flex flex-col"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />

                <h3 className="text-lg font-semibold text-gray-800 mt-2 truncate">
                  {product.name}
                </h3>

                <p className="text-orange-500 font-bold mt-1">
                  ₹{product.price}
                </p>

                <Link to={`/product/${product._id}`} className="mt-auto">
                  <button className="mt-3 w-full bg-blue-700 text-white py-2 px-4 rounded hover:bg-blue-800 transition">
                    View
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
