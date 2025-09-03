// routes/cartRoute.js
import Product from "../models/Product.js";

import { Router } from "express";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import Cart from "../models/Cart.js";

const router = Router();

// New GET route to fetch the user's cart
router.get("/", ClerkExpressWithAuth(), async (req, res) => {
  const { userId } = req.auth;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      // If no cart is found, return an empty cart object
      return res.status(200).json({ userId, items: [] });
    }

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Fetch cart error:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// Your existing POST route for adding items to the cart
router.post("/add", ClerkExpressWithAuth(), async (req, res) => {
  const { productId, quantity } = req.body;
  const { userId } = req.auth;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
      cart = await cart.save();
      return res.status(200).json(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    res.status(500).json({ error: "Failed to add item to cart" });
  }
});

// PATCH /api/cart/update-quantity
router.patch("/update-quantity", ClerkExpressWithAuth(), async (req, res) => {
  const { userId } = req.auth;
  const { productId, action } = req.body;

  if (!userId || !productId || !action) {
    return res
      .status(400)
      .json({ error: "Missing userId, productId, or action." });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart." });
    }

    const cartItem = cart.items[itemIndex];

    // THIS LINE MUST BE HERE, BEFORE ANY USAGE OF 'product'
    const product = await Product.findById(productId); // Line where 'product' is initialized

    if (!product) {
      // This is likely line 90 in your file based on the error
      // If product doesn't exist anymore, remove from cart
      cart.items.splice(itemIndex, 1);
      await cart.save();
      // Re-populate and send the updated cart back, as it changed
      const updatedCartAfterRemoval = await Cart.findOne({ userId }).populate(
        "items.productId"
      );
      return res.status(404).json({
        error: "Product no longer exists. Removed from cart.",
        cart: updatedCartAfterRemoval, // Send updated cart to client
      });
    }

    if (action === "increase") {
      if (cartItem.quantity < product.countInStock) {
        // 'product' used here
        cartItem.quantity += 1;
      } else {
        return res.status(400).json({
          error: `Cannot increase quantity. Only ${product.countInStock} available in stock.`,
        });
      }
    } else if (action === "decrease") {
      if (cartItem.quantity > 1) {
        cartItem.quantity -= 1;
      } else {
        // If quantity becomes 0, remove the item entirely from the cart
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res
        .status(400)
        .json({ error: 'Invalid action. Must be "increase" or "decrease".' });
    }

    await cart.save();
    // Re-populate and send the updated cart back
    const updatedCart = await Cart.findOne({ userId }).populate(
      "items.productId"
    );
    return res.status(200).json(updatedCart);
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    res.status(500).json({ error: "Failed to update cart item quantity." });
  }
});

export default router;
