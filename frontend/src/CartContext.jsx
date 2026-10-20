import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const STORAGE_KEY = "cart";

// Saved cart ko safely load karta hai (ids string me convert, kharab data ignore)
function loadCart() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item) => item && item.id != null)
      .map((item) => ({
        ...item,
        id: String(item.id),
        price: Number(item.price) || 0,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }));
  } catch {
    return [];
  }
}

// Stock maloom ho to wahi limit, warna koi limit nahi
function getMaxQuantity(item) {
  const stock = Number(item.stock);
  return Number.isFinite(stock) && item.stock != null ? stock : Infinity;
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  // Cart badalte hi session me save karein
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // storage full ya blocked ho to app chalti rahe
    }
  }, [cart]);

  const addToCart = (product) => {
    const productId = String(product.id);

    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === productId);

      if (existing) {
        const max = getMaxQuantity(existing);

        return currentCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.min(item.quantity + 1, max) }
            : item
        );
      }

      // Out of stock product cart me add nahi hoga
      if (getMaxQuantity(product) < 1) return currentCart;

      return [
        ...currentCart,
        {
          ...product,
          id: productId,
          price: Number(product.price) || 0,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    const id = String(productId);
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (productId, quantity) => {
    const id = String(productId);
    const newQuantity = Number(quantity);

    if (!Number.isFinite(newQuantity)) return;

    // 1 se kam ho to item hata do
    if (newQuantity < 1) {
      setCart((currentCart) => currentCart.filter((item) => item.id !== id));
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.min(Math.floor(newQuantity), getMaxQuantity(item)),
            }
          : item
      )
    );
  };

  // Order successful hone ke baad poora cart khali karein
  const clearCart = () => {
    setCart([]);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = Number(
    cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2)
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}