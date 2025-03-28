import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [logIn, setlogIn] = useState(false);

  const addToCart = (item) => {
    setCartData((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        );
      }
      return [...prevCart, item];
    });
  };

  console.log("=======================");
  console.log(logIn);
  console.log("=======================");

  return (
    <AppContext.Provider
      value={{ cartData, addToCart, setCartData, logIn, setlogIn }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useCart = () => useContext(AppContext);
