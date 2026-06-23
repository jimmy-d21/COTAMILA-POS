import { createContext, useContext, useState, useCallback, useMemo } from "react";

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = useCallback((item) => {
    setCart((prev) => [...prev, { ...item, cartId: Date.now() }]);
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateCartItem = useCallback((id, updates) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    totalItems: cart.length,
    totalPrice: cart.reduce((sum, item) => sum + (item.price || 0), 0),
  }), [cart, addToCart, removeFromCart, updateCartItem, clearCart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
