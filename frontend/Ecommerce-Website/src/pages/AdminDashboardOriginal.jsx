import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const AdminDashboardOriginal = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    countInStock: "",
    image: null,
  });

  // ✅ Fetch products
  const fetchProducts = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${API_URL}/api/admin/products`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  // ✅ Fetch users
  const fetchUsers = async () => {
    try {
      const token = await getToken();
      const res = await axios.get(`${API_URL}/api/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch users error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
  }, []);

  // ✅ Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // ✅ Create or Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));

      if (editingProduct) {
        await axios.put(
          `${API_URL}/api/admin/products/${editingProduct._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(`${API_URL}/api/admin/products/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        countInStock: "",
        image: null,
      });
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Save failed", err.response?.data || err);
    }
  };

  // ✅ Handle edit product
  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      countInStock: product.countInStock,
      image: null,
    });
  };

  // ✅ Handle delete product
  const handleDelete = async (id) => {
    try {
      const token = await getToken();
      await axios.delete(`${API_URL}/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // ✅ Handle role change
  const handleChangeRole = async (userId, currentRole) => {
    try {
      const token = await getToken();
      const newRole = currentRole === "admin" ? "user" : "admin";
      await axios.patch(
        `${API_URL}/api/admin/users/${userId}/role`,
        { role: newRole },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchUsers();
    } catch (err) {
      console.error("Role update failed", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Product Form */}
      <form onSubmit={handleSubmit} className="mb-6 grid gap-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2"
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2"
        />
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className="border p-2"
        />
        <input
          type="number"
          name="countInStock"
          value={form.countInStock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          className="border p-2"
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="border p-2"
        />
        <button type="submit" className="bg-blue-600 text-white py-2">
          {editingProduct ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* Product List */}
      <h2 className="text-xl font-semibold mb-3">All Products</h2>
      <div className="grid gap-4 mb-8">
        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p._id}
              className="border p-4 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold">{p.name}</h3>
                <p>${p.price}</p>
                <p>Stock: {p.countInStock}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="bg-yellow-500 text-white px-3 py-1"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 text-white px-3 py-1"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>

      {/* Users List */}
      <h2 className="text-xl font-semibold mb-3">All Users</h2>
      <div className="border p-4">
        {users.length > 0 ? (
          users.map((user) => (
            <div
              key={user.id}
              className="border-b py-2 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>
                    {user.firstName} {user.lastName}
                  </strong>{" "}
                  ({user.email})
                </p>
                <p>Role: {user.role}</p>
              </div>
              <button
                onClick={() => handleChangeRole(user.id, user.role)}
                className={`px-3 py-1 ${
                  user.role === "admin" ? "bg-gray-600" : "bg-green-500"
                } text-white`}
              >
                {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
              </button>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardOriginal;
