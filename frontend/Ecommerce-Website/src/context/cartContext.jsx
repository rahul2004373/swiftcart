import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useClerk } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { isLoaded, isSignedIn } = useAuth();
  const { session } = useClerk();
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCart = async () => {
    if (!isSignedIn) {
      setCart(null);
      return;
    }

    try {
      const token = await session.getToken();
      const response = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
    }
  };

  // NEW FUNCTION: Increase item quantity
  const increaseQuantity = async (productId) => {
    if (!isSignedIn) {
      alert("Please log in to modify your cart.");
      return;
    }
    try {
      const token = await session.getToken();
      const response = await axios.patch(
        `${API_URL}/api/cart/update-quantity`,
        { productId, action: "increase" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data); // Backend sends back the updated cart
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Failed to increase quantity:", error);
      alert(error.response?.data?.error || "Failed to increase quantity."); // Display specific error from backend
    }
  };

  // NEW FUNCTION: Decrease item quantity
  const decreaseQuantity = async (productId) => {
    if (!isSignedIn) {
      alert("Please log in to modify your cart.");
      return;
    }
    try {
      const token = await session.getToken();
      const response = await axios.patch(
        `${API_URL}/api/cart/update-quantity`,
        { productId, action: "decrease" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data); // Backend sends back the updated cart
      toast.error("Item Quantity Descreased."); // Optional: show success message
    } catch (error) {
      console.error("Failed to decrease quantity:", error);
      alert(error.response?.data?.error || "Failed to decrease quantity."); // Display specific error from backend
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchCart();
    }
  }, [isLoaded, isSignedIn]);

  return (
    <CartContext.Provider
      value={{ cart, fetchCart, increaseQuantity, decreaseQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
