import React, { useState } from "react";

const ProductUploadForm = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "books", // default selected
  });

  const [image, setImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploadStatus("Uploading...");

    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category", product.category);
      if (image) {
        formData.append("image", image); // must match multer field name
      }

      const res = await fetch(`${API_URL}/api/products/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setUploadStatus("Product uploaded successfully!");
        console.log("Server response:", data);
        setProduct({ name: "", price: "", description: "", category: "books" });
        setImage(null);
      } else {
        setUploadStatus(`Upload failed: ${data.error}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setUploadStatus("❌ Upload error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-8"
    >
      <h2 className="text-xl font-bold mb-4">Upload Product</h2>

      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={product.name}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <textarea
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      />

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="w-full mb-3 p-2 border rounded"
        required
      >
        <option value="books">Books</option>
        <option value="fashion">Fashion</option>
        <option value="sports">Sports</option>
        <option value="electronics">Electronics</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Upload Product
      </button>

      {uploadStatus && (
        <p className="mt-4 text-sm text-gray-800">{uploadStatus}</p>
      )}
    </form>
  );
};

export default ProductUploadForm;
