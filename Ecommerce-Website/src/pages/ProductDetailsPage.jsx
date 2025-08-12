import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useCart } from "../context/CartContext";
// const { addToCart } = useCart();

const ProductDetailsPage = () => {
  const { addToCart } = useCart();

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Product load error:", err));
  }, [id]);

  if (!product) return <div className="p-6">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Main Image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg mb-4"
          />

          {/* Thumbnails */}
          <div className="flex gap-3 mt-2">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-20 h-20 object-cover border border-gray-200 rounded"
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-500 mt-2">{product.description}</p>

          <p className="text-3xl text-orange-500 font-semibold mt-4">
            ₹{product.price}
          </p>

          <button
            className="mt-6 bg-blue-700 text-white px-6 py-3 rounded hover:bg-blue-800 transition"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
