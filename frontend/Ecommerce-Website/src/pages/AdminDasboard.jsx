import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

// You need to have `lucide-react` installed:
// npm install lucide-react
import {
  FilePenLine,
  Trash2,
  Users,
  Package2,
  Plus,
  X,
  ArrowUpFromLine,
} from "lucide-react";

const AdminDashboard = () => {
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [isFormVisible, setIsFormVisible] = useState(false);
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
      const res = await axios.get("http://localhost:8080/api/admin/products", {
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
      const res = await axios.get("http://localhost:8080/api/admin/users", {
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
      Object.keys(form).forEach((key) => {
        if (form[key]) {
          formData.append(key, form[key]);
        }
      });

      if (editingProduct) {
        await axios.put(
          `http://localhost:8080/api/admin/products/${editingProduct._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post(
          "http://localhost:8080/api/admin/products/upload", // Retaining your original POST endpoint
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
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
      setIsFormVisible(false);
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
    setIsFormVisible(true);
  };

  // ✅ Handle delete product
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const token = await getToken();
        await axios.delete(`http://localhost:8080/api/admin/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchProducts();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  // ✅ Handle role change
  const handleChangeRole = async (userId, currentRole) => {
    if (window.confirm(`Are you sure you want to change this user's role?`)) {
      try {
        const token = await getToken();
        const newRole = currentRole === "admin" ? "user" : "admin";
        await axios.patch(
          `http://localhost:8080/api/admin/users/${userId}/role`,
          { role: newRole },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchUsers();
      } catch (err) {
        console.error("Role update failed", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
            Admin Dashboard
          </h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "products"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
              }`}
            >
              <Package2 size={18} /> Products
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeTab === "users"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-zinc-200 hover:bg-zinc-300 text-zinc-700"
              }`}
            >
              <Users size={18} /> Users
            </button>
          </div>
        </header>

        {/* --- Products Management Section --- */}
        {activeTab === "products" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-2">
              <h2 className="text-2xl font-bold">Manage Products</h2>
              <button
                onClick={() => {
                  setIsFormVisible(!isFormVisible);
                  setEditingProduct(null);
                  setForm({
                    name: "",
                    description: "",
                    price: "",
                    category: "",
                    countInStock: "",
                    image: null,
                  });
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors duration-200"
              >
                <Plus size={18} /> New Product
              </button>
            </div>

            {/* Product Form - Conditional rendering with a slide-down animation */}
            <div
              className={`grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-in-out ${
                isFormVisible ? "grid-rows-[1fr] mb-6" : ""
              }`}
            >
              <div className="overflow-hidden">
                <form
                  onSubmit={handleSubmit}
                  className="bg-zinc-100 p-6 rounded-lg space-y-4 shadow-inner"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-zinc-800">
                      {editingProduct ? "Edit Product" : "Add New Product"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsFormVisible(false)}
                      className="p-2 text-zinc-500 hover:text-zinc-700 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Product Name"
                      className="border border-zinc-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Description"
                      className="border border-zinc-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <input
                      type="number"
                      name="price"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Price"
                      className="border border-zinc-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="border border-zinc-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-zinc-700"
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      <option value="sports">Sports</option>
                      <option value="fashion">Fashion</option>
                      <option value="books">Books</option>
                      <option value="electronics">Electronics</option>
                    </select>
                    <input
                      type="number"
                      name="countInStock"
                      value={form.countInStock}
                      onChange={handleChange}
                      placeholder="Stock Quantity"
                      className="border border-zinc-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                    <label className="flex items-center justify-between border border-zinc-300 rounded-md p-3 cursor-pointer bg-white hover:bg-zinc-50 transition-colors">
                      <span className="text-zinc-500 truncate mr-2">
                        {form.image ? form.image.name : "Choose Image"}
                      </span>
                      <ArrowUpFromLine size={20} className="text-blue-600" />
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                    >
                      {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Product List */}
            <div className="space-y-4">
              {products.length > 0 ? (
                products.map((p) => (
                  <div
                    key={p._id}
                    className="flex flex-col sm:flex-row justify-between items-center bg-zinc-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex-grow mb-2 sm:mb-0">
                      <h3 className="font-bold text-lg">{p.name}</h3>
                      <p className="text-zinc-600">${p.price}</p>
                      <p className="text-sm text-zinc-500">
                        Stock: {p.countInStock}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(p)}
                        className="p-2 text-yellow-600 bg-yellow-100 rounded-full hover:bg-yellow-200 transition-colors"
                        title="Edit Product"
                      >
                        <FilePenLine size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-2 text-red-600 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-zinc-500 py-4">
                  No products found.
                </p>
              )}
            </div>
          </div>
        )}

        {/* --- Users Management Section --- */}
        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Manage Users</h2>
            <div className="space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col sm:flex-row justify-between items-center bg-zinc-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex-grow mb-2 sm:mb-0">
                      <p className="font-bold text-lg">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-zinc-600">{user.email}</p>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                          user.role === "admin"
                            ? "bg-purple-200 text-purple-800"
                            : "bg-zinc-200 text-zinc-700"
                        }`}
                      >
                        Role: {user.role}
                      </span>
                    </div>
                    <button
                      onClick={() => handleChangeRole(user.id, user.role)}
                      className={`px-4 py-2 rounded-full font-medium text-white transition-colors duration-200 ${
                        user.role === "admin"
                          ? "bg-orange-500 hover:bg-orange-600"
                          : "bg-blue-500 hover:bg-blue-600"
                      }`}
                    >
                      {user.role === "admin" ? "Revoke Admin" : "Make Admin"}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-zinc-500 py-4">
                  No users found.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
