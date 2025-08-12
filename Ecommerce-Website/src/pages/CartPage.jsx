import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();

  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white p-4 rounded shadow justify-between"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />

              <div className="flex-1 ml-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="text-orange-500 mt-1">₹{item.price}</p>

                <div className="flex mt-2 items-center gap-2">
                  <label className="text-gray-600">Qty:</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, parseInt(e.target.value))
                    }
                    className="w-16 border border-gray-300 rounded px-2 py-1"
                    min="1"
                  />
                </div>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-right text-xl font-semibold text-gray-800 mt-6">
            Total: ₹{total}
          </div>

          <div className="text-right">
            <button
              onClick={() => navigate("/checkout")}
              className="mt-3 bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
