import { createContext, useContext, useEffect, useState } from "react";

/* -------------------------------------------------------
   Context setup
------------------------------------------------------- */
const CartContext = createContext();

// Export the hook as a named function declaration for Fast Refresh compatibility
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

/* -------------------------------------------------------
   Provider
------------------------------------------------------- */
export function CartProvider({ children }) {
  /* 1️⃣  Initialize cart state */
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  /* 2️⃣  Load cart from server on mount (if user is logged in) */
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      fetchCartFromServer(token);
    }
  }, []);

  /* 3️⃣  Helper to get auth token (replace with your auth logic) */
  const getAuthToken = () => {
    // Replace this with your actual token retrieval logic
    // For artifacts, you might need to pass token as prop or use different auth method
    return null; // localStorage.getItem("token");
  };

  /* 4️⃣  CRUD helpers */
  const addToCart = (product) => {
    setError(null);
    const exists = cartItems.find((item) => item._id === product._id);

    if (exists) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setError(null);
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setError(null);
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCartItems(
      cartItems.map((item) => (item._id === id ? { ...item, quantity } : item))
    );
  };

  /* 5️⃣  Clear cart manually (e.g. after checkout) */
  const clearCart = () => {
    setCartItems([]);
    setError(null);
  };

  /* 6️⃣  Server sync functions with proper error handling */
  const syncCartToServer = async (token) => {
    if (!token) {
      setError("No authentication token provided");
      return false;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return true;
    } catch (err) {
      console.error("Cart sync failed:", err);
      setError("Failed to sync cart to server");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCartFromServer = async (token) => {
    if (!token) {
      setError("No authentication token provided");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setCartItems(data || []);
    } catch (err) {
      console.error("Failed to load server cart:", err);
      setError("Failed to load cart from server");
    } finally {
      setIsLoading(false);
    }
  };

  /* 7️⃣  Auto-sync to server when cart changes (debounced) */
  useEffect(() => {
    const token = getAuthToken();
    if (!token || cartItems.length === 0) return;

    const timeoutId = setTimeout(() => {
      syncCartToServer(token);
    }, 1000); // Debounce for 1 second

    return () => clearTimeout(timeoutId);
  }, [cartItems]);

  /* 8️⃣  Calculate cart totals */
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  /* -----------------------------------------------------
     Expose context value
  ----------------------------------------------------- */
  return (
    <CartContext.Provider
      value={{
        // State
        cartItems,
        cartTotal,
        cartCount,
        isLoading,
        error,

        // Actions
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        syncCartToServer,
        fetchCartFromServer,

        // Direct setter (use with caution)
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
