import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useCart } from "../context/CartContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { cartItems, setCartItems } = useCart(); // ⬅️ access cart context

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // 1️⃣ Log in
      const res = await axios.post("/v1/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);

      // 2️⃣ Sync or fetch cart
      if (cartItems.length > 0) {
        // push local cart to server
        await axios.post(
          "/cart",
          { cartItems },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        // pull saved cart from server
        const saved = await axios.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(saved.data); // update local state
      }

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-200 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-200 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
