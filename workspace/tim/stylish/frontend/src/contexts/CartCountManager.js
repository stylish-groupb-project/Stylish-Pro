//全局管理
import { createContext, useState, useMemo } from "react";

const storedCart = localStorage.getItem("cart");
const initialCount = storedCart ? JSON.parse(storedCart).length : 0;

const CartCountContext = createContext({
  count: initialCount,
  incrementCartCount: () => {},
});

const CartCountProvider = ({ children }) => {
  const [count, setCount] = useState(initialCount);
  const incrementCartCount = () => {
    setCount(count + 1);
  };
  //用於避免不必要的渲染
  const contextValue = useMemo(() => ({ count, incrementCartCount }), [count]);

  return <CartCountContext.Provider value={contextValue}>{children}</CartCountContext.Provider>;
};

export { CartCountProvider, CartCountContext };
