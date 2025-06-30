"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItemType = {
  id: string;
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  addcount: number;
};

type CartContextType = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  cartCount: number;
  updateCartCount: () => void;
  address: string;
  setAddress: (addr: string) => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("FoodCart");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [cartCount, setCartCount] = useState<number>(0);
  const [address, setAddressState] = useState<string>("");

  const updateCartCount = () => {
    const total = cart.reduce((sum, item) => sum + item.addcount, 0);
    setCartCount(total);
  };

  useEffect(() => {
    const storedAddress = localStorage.getItem("DeliveryAddress");
    if (storedAddress) setAddressState(storedAddress);
  }, []);

  const setAddress = (addr: string) => {
    localStorage.setItem("DeliveryAddress", addr);
    setAddressState(addr);
  };

  useEffect(() => {
    localStorage.setItem("FoodCart", JSON.stringify(cart));
    updateCartCount();
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart, setCart, cartCount, updateCartCount, address, setAddress }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
