import { useEffect, useState } from "react";

import CartContext from "./CartContext";
const STORAGE_KEY = "itx-cart-count";

export default function CartProvider({ children }) {
  const [count, setCount] = useState(() => {
    return Number(localStorage.getItem(STORAGE_KEY)) || 0;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(count));
  }, [count]);

  return (
    <CartContext.Provider value={{ count, setCount }}>
      {children}
    </CartContext.Provider>
  );
}