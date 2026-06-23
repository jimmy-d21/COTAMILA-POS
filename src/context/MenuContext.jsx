import { createContext, useContext, useState } from "react";
import { mockMenuItems } from "../data/menuData.js";

const MenuContext = createContext(undefined);

export const MenuProvider = ({ children }) => {
  const [menuItems, setMenuItems] = useState(mockMenuItems);

  const addMenuItem = (item) => {
    setMenuItems((prev) => [...prev, item]);
  };

  const updateMenuItem = (id, updates) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item)),
    );
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        addMenuItem,
        updateMenuItem,
        deleteMenuItem,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error("useMenu must be used within a MenuProvider");
  }
  return context;
};
