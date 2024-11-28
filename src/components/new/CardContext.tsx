"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

// Define the types for cart products and the context
interface CartContextType {
  cartProducts: string[]; // Assuming the cart contains an array of product IDs (strings)
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

interface CartContextProviderProps {
  children: ReactNode;
}

// Create the context with a default value (empty object, which will be replaced by actual values)
export const CartContexts = createContext<CartContextType | undefined>(
  undefined
);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  // On mount, sync with localStorage
  useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  // On cart update, sync with localStorage
  useEffect(() => {
    if (cartProducts.length) {
      window.localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  const addToCart = (id: string) => {
    setCartProducts((prev) => [...prev, id]);
  };

  const removeFromCart = (id: string) => {
    setCartProducts((prev) => {
      const index = prev.indexOf(id);
      if (index !== -1) {
        return prev.filter((item, i) => i !== index);
      }
      return prev;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
  };

  return (
    <CartContexts.Provider
      value={{ cartProducts, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContexts.Provider>
  );
}
