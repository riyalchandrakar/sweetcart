import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

const CART_KEY = "sweetshop_cart";

const CartProvider = ({ children }) => {
  // ✅ INIT FROM localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ✅ SAVE TO localStorage ON CHANGE
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (sweet, qty) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === sweet._id);

      if (existing) {
        return prev.map((i) =>
          i._id === sweet._id
            ? { ...i, qty: i.qty + qty }
            : i
        );
      }

      return [...prev, { ...sweet, qty }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
